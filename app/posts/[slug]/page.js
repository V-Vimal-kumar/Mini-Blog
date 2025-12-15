import { notFound } from "next/navigation";
import PostActions from "./PostActions";

async function getPost(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL(`/api/posts/${slug}`, base).toString();

    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return notFound();

  return (
    <section className="max-w-3xl mx-auto">
      <article className="glass rounded-3xl px-6 py-8 sm:px-10 sm:py-10">

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent"
        >
          {post.title}
        </h1>

        {/* Meta (Prisma-safe) */}
        <p className="mt-4 text-sm text-slate-400">
          {post.createdAt
            ? new Date(post.createdAt).toISOString().split("T")[0]
            : ""}
        </p>

        {/* Edit / Delete */}
        <PostActions slug={slug} post={post} />

        {/* Divider */}
        <div
          className="mt-6 h-px bg-gradient-to-r from-indigo-400/40 via-cyan-400/40 to-transparent"
        />

        {/* Content */}
        <div
          className="prose prose-invert prose-lg mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </section>
  );
}
