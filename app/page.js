// app/page.js
import Link from "next/link";

async function getPosts() {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL("/api/posts", base).toString();
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <section>
      {/* Page intro */}
      <header className="mb-14 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">
          Latest thoughts ✨
        </h1>
        <p className="mt-3 text-slate-400">
          A calm place to write, read, and reflect. Built for focus.
        </p>
      </header>

      {/* Empty state */}
      {posts.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center text-slate-400">
          No posts yet. Start writing something meaningful.
        </div>
      )}

      {/* Posts */}
      {posts.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => (
            <article
              key={p.id}
              className="group glass rounded-3xl p-6 transition-all
                         hover:-translate-y-2 hover:shadow-2xl
                         hover:shadow-indigo-500/20"
            >
              <h2 className="text-xl font-semibold tracking-tight
                             group-hover:text-cyan-300 transition">
                <Link href={`/posts/${p.slug}`}>{p.title}</Link>
              </h2>

              <p
                className="mt-4 text-sm text-slate-300 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: p.summary }}
              />

              <div className="mt-6 flex items-center justify-between
                              text-xs text-slate-400">
                <time>{new Date(p.createdAt).toLocaleDateString()}</time>
                <Link
                  href={`/posts/${p.slug}`}
                  className="text-cyan-300 font-medium hover:underline"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
