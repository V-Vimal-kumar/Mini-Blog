import { getAllPosts } from "@/lib/posts";
import PostGrid from "@/components/posts/PostGrid";

export default async function HomePage() {
  const posts = await getAllPosts();

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
      {posts.length > 0 && <PostGrid posts={posts} />}
    </section>
  );
}
