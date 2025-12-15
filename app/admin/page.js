"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [form, setForm] = useState({ title: "", summary: "", content: "" });

  // toast + delete modal state
  const [toast, setToast] = useState(null);
  const [deleteSlug, setDeleteSlug] = useState(null);

  /* ---------------- helpers ---------------- */

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  function resetForm() {
    setForm({ title: "", summary: "", content: "" });
    setEditingSlug(null);
    setSaving(false);
  }

  /* ---------------- data ---------------- */

  useEffect(() => {
    fetch("/api/posts").then(r => r.json()).then(setPosts);
  }, []);

  // load edit data from Read page
  useEffect(() => {
    const edit = localStorage.getItem("editPost");
    if (edit) {
      const p = JSON.parse(edit);
      setEditingSlug(p.slug);
      setForm({
        title: p.title,
        summary: p.summary,
        content: p.content,
      });
      localStorage.removeItem("editPost");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  /* ---------------- actions ---------------- */

  async function createPost(e) {
    e.preventDefault();
    if (!form.title || !form.content) {
      showToast("error", "Title and content are required");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setPosts(prev => [data, ...prev]);
    showToast("success", "Post published successfully ✨");
    resetForm();
  }

  async function updatePost(e) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/posts/${editingSlug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setPosts(prev => prev.map(p => (p.slug === editingSlug ? data : p)));
    showToast("success", "Post updated successfully ✍️");
    resetForm();
  }

  async function confirmDelete() {
    await fetch(`/api/posts/${deleteSlug}`, { method: "DELETE" });
    setPosts(prev => prev.filter(p => p.slug !== deleteSlug));
    setDeleteSlug(null);
    showToast("success", "Post deleted 🗑️");
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-5xl mx-auto space-y-16">

      {/* ================= CREATOR ================= */}
    <section
  className="glass rounded-[2rem] shadow-2xl shadow-indigo-500/20
             flex flex-col max-h-[680px] w-full mx-auto"
>
  {/* Header */}
  <div className="px-8 pt-8 pb-4">
    <h2 className="text-3xl font-semibold
                   bg-gradient-to-r from-indigo-400 to-cyan-400
                   bg-clip-text text-transparent">
      {editingSlug ? "Refine your story ✍️" : "Create something beautiful ✨"}
    </h2>
  </div>

  {/* FORM (body + footer together) */}
  <form
    onSubmit={editingSlug ? updatePost : createPost}
    className="flex flex-col flex-1"
  >
    {/* Scrollable body */}
    <div className="flex-1 overflow-y-auto px-8 space-y-5">
      <input
        value={form.title ?? ""}
        onChange={e => setForm({ ...form, title: e.target.value })}
        placeholder="Post title"
        className="w-full p-4 text-lg rounded-2xl"
      />

      <input
        value={form.summary ?? ""}
        onChange={e => setForm({ ...form, summary: e.target.value })}
        placeholder="Short summary (optional)"
        className="w-full p-4 rounded-2xl"
      />

      <textarea
        value={form.content ?? ""}
        onChange={e => setForm({ ...form, content: e.target.value })}
        placeholder="Write freely. No pressure. Just ideas flowing…"
        className="w-full min-h-[220px] resize-none
                   p-5 rounded-2xl text-sm leading-relaxed"
      />
    </div>

    {/* Footer actions (NOW INSIDE FORM ✅) */}
    <div className="px-8 py-6 border-t border-white/10
                    flex justify-end gap-4">
      <button
        type="submit"
        disabled={saving}
        className="px-10 py-3 rounded-full
                   bg-gradient-to-r from-indigo-400 to-cyan-400
                   text-black font-medium shadow-xl shadow-cyan-500/30
                   hover:scale-105 transition"
      >
        {saving ? "Saving…" : editingSlug ? "Update Post" : "Publish Post"}
      </button>

      <button
        type="button"
        onClick={resetForm}
        className="px-10 py-3 rounded-full
                   border border-white/20
                   hover:bg-white/10 transition"
      >
        Reset
      </button>
    </div>
  </form>
</section>




      {/* ================= POSTS ================= */}
      <section className="space-y-6">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-200">
          Your Posts
        </h3>

        {posts.length === 0 && (
          <div className="glass rounded-2xl p-10 text-center text-slate-400">
            No posts yet. Your ideas will live here ✨
          </div>
        )}

        <div className="grid gap-6">
          {posts.map(p => (
            <div
              key={p.id}
              className="glass rounded-2xl p-6 flex flex-col sm:flex-row
                         sm:items-center sm:justify-between
                         transition hover:-translate-y-1 hover:shadow-xl
                         hover:shadow-indigo-500/20"
            >
              <div className="space-y-1">
                <div className="text-lg font-medium text-slate-100">
                  {p.title}
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(p.createdAt).toISOString().split("T")[0]}
                </div>
              </div>

              <div className="flex gap-4 mt-4 sm:mt-0 text-sm">
                <a
                  href={`/posts/${p.slug}`}
                  className="text-cyan-300 hover:underline"
                >
                  Open
                </a>

                <button
                  onClick={() => {
                    setEditingSlug(p.slug);
                    setForm({
                      title: p.title,
                      summary: p.summary,
                      content: p.content,
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-indigo-300 hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteSlug(p.slug)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TOAST ================= */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl glass
                      shadow-2xl animate-fade-in
                      ${
                        toast.type === "success"
                          ? "border border-cyan-400/30 text-cyan-300"
                          : "border border-red-400/30 text-red-300"
                      }`}
        >
          {toast.message}
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {deleteSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-semibold text-slate-100 mb-3">
              Delete post?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 rounded-full
                           bg-gradient-to-r from-red-400 to-pink-500
                           text-black font-medium
                           hover:scale-105 transition"
              >
                Delete
              </button>

              <button
                onClick={() => setDeleteSlug(null)}
                className="flex-1 px-6 py-3 rounded-full border border-white/20
                           hover:bg-white/10 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
