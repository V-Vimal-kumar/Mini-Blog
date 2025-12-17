"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const editBtn =
  "px-5 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-black text-sm font-medium shadow-lg hover:scale-105 transition";

export default function PostActions({ post }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const canEdit =
    session?.user?.id === post.authorId;

  if (!canEdit) return null;

  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={() => router.push(`/admin?edit=${post.slug}`)}
        className={editBtn}
      >
        Edit
      </button>
    </div>
  );
}
