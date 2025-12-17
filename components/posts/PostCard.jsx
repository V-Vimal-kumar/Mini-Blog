"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function PostCard({ post }) {
  const { data: session } = useSession();
  const isMine = session?.user?.id === post.authorId;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group glass rounded-3xl p-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 block"
    >
      {/* Title + badge */}
      <div className="flex items-start justify-between gap-3">
        <h2
          className="text-xl font-semibold tracking-tight group-hover:text-cyan-300 transition"
        >
          {post.title}
        </h2>

        {isMine && (
          <span
            title="Your post"
            className="shrink-0 mt-1 w-2.5 h-2.5 rounded-full bg-cyan-400"
          />
        )}
      </div>

      {/* Summary */}
      <p
        className="mt-4 text-sm text-slate-300 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: post.summary }}
      />

      {/* Footer */}
      <div
        className="mt-6 flex items-center justify-between text-xs text-slate-400"
      >
        <time>
          {new Date(post.createdAt).toISOString().split("T")[0]
}
        </time>

        <span className="text-cyan-300 font-medium group-hover:underline">
          Read →
        </span>
      </div>
    </Link>
  );
}
