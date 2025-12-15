"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const editBtn =
  "px-5 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-black text-sm font-medium shadow-lg shadow-cyan-500/25 hover:scale-105 transition";

const deleteBtn =
  "px-5 py-2 rounded-full border border-red-400/40 text-red-400 text-sm hover:bg-red-400/10 transition";

export default function PostActions({ slug, post }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  async function handleDelete() {
    if (!confirm("Delete this post permanently?")) return;
    setLoading(true);
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mt-6 flex gap-3">
      <button onClick={handleEdit} className={editBtn}>
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className={deleteBtn}
      >
        {loading ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
