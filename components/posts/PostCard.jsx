import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <article
      className="group glass rounded-3xl p-6 transition-all
                 hover:-translate-y-2 hover:shadow-2xl
                 hover:shadow-indigo-500/20"
    >
      <h2
        className="text-xl font-semibold tracking-tight
                   group-hover:text-cyan-300 transition"
      >
        <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      </h2>

      <p
        className="mt-4 text-sm text-slate-300 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: post.summary }}
      />

      <div
        className="mt-6 flex items-center justify-between
                   text-xs text-slate-400"
      >
        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
        <Link
          href={`/posts/${post.slug}`}
          className="text-cyan-300 font-medium hover:underline"
        >
          Read →
        </Link>
      </div>
    </article>
  );
}
