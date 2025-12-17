"use client";

import { useSession } from "next-auth/react";

export default function PostList({ posts, onEdit, onDelete }) {
  const { data: session } = useSession();

  if (!posts || posts.length === 0) {
    return (
      <div className="glass rounded-2xl p-10 text-center text-slate-400">
        No posts yet. Your ideas will live here ✨
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-slate-200">
        Posts
      </h3>

      <div className="grid gap-6">
        {posts.map(p => {
          // 🔐 ownership check
          const isMine = session?.user?.id === p.authorId;

          // 🛑 guard against broken data
          if (p?.id == null) return null;

          return (
            <div
              key={p.id}  
              className="glass rounded-2xl p-6 flex items-start justify-between gap-4"
            >
              {/* LEFT: title + date */}
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-slate-100 truncate">
                    {p.title}
                  </span>

                  {/* optional indicator */}
                  {/* {isMine && (
                    <span
                      title="Your post"
                      className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                    />
                  )} */}
                </div>

                <div className="text-xs text-slate-400">
                  {p.createdAt
                    ? new Date(p.createdAt).toISOString().split("T")[0]
                    : "—"}
                </div>
              </div>

              {/* RIGHT: actions */}
              <div className="flex items-center gap-3 text-sm shrink-0">
                <a
                  href={`/posts/${p.slug}`}
                  className="px-3 py-1.5 rounded-full
                             text-cyan-300 hover:bg-cyan-300/10 transition"
                >
                  Open
                </a>

                {isMine && (
                  <>
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1.5 rounded-full
                                 text-indigo-300 hover:bg-indigo-300/10 transition"
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
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
