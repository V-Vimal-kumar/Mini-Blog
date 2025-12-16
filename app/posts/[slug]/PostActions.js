"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const editBtn =
  "px-5 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-black text-sm font-medium shadow-lg shadow-cyan-500/25 hover:scale-105 transition";

export default function PostActions({ slug, post }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") return null;
  if (!session) return null;

  function handleEdit() {
    localStorage.setItem(
      "editPost",
      JSON.stringify({
        slug,
        title: post.title,
        summary: post.summary,
        content: post.content,
      })
    );
    router.push("/admin");
  }

  return (
    <div className="mt-6 flex gap-3">
      <button onClick={handleEdit} className={editBtn}>
        Edit
      </button>
    </div>
  );
}
