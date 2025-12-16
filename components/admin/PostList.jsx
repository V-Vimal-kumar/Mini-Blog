"use client";

export default function PostList({ posts, onEdit, onDelete }) {
    if (posts.length === 0) {
        return (
            <div className="glass rounded-2xl p-10 text-center text-slate-400">
                No posts yet. Your ideas will live here ✨
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <h3 className="text-2xl font-semibold text-slate-200">
                Your Posts
            </h3>

            <div className="grid gap-6">
                {posts.map(p => (
                    <div
                        key={p.id}
                        className="glass rounded-2xl p-6 flex justify-between"
                    >
                        <div>
                            <div className="text-lg text-slate-100">{p.title}</div>
                            <div className="text-xs text-slate-400">
                                {new Date(p.createdAt).toISOString().split("T")[0]}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm">
                            <a
                                href={`/posts/${p.slug}`}
                                className="px-3 py-1.5 rounded-full
               text-cyan-300 hover:bg-cyan-300/10
               transition text-center"
                            >
                                Open
                            </a>

                            <button
                                onClick={() => onEdit(p)}
                                className="px-3 py-1.5 rounded-full
               text-indigo-300 hover:bg-indigo-300/10
               transition"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(p.slug)}
                                className="px-3 py-1.5 rounded-full
               border border-red-400/40 text-red-400
               hover:bg-red-400/10 transition"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}
