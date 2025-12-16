"use client";

import { useEffect, useState } from "react";
import PostForm from "@/components/admin/PostForm";
import PostList from "@/components/admin/PostList";
import Toast from "@/components/admin/Toast";
import DeleteModal from "@/components/admin/DeleteModel";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", summary: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteSlug, setDeleteSlug] = useState(null);

  /* ---------- mount ---------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* ---------- fetch posts ---------- */
  useEffect(() => {
    if (!mounted) return;

    fetch("/api/posts")
      .then(r => r.json())
      .then(setPosts)
      .catch(() =>
        setToast({ type: "error", message: "Failed to load posts" })
      );
  }, [mounted]);

  /* ---------- helpers ---------- */
  function resetForm() {
    setForm({ title: "", summary: "", content: "" });
    setEditingSlug(null);
    setSaving(false);
  }

  /* ---------- submit ---------- */
  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ frontend validation
    if (!form.title.trim() || !form.content.trim()) {
      setToast({ type: "error", message: "Title and content are required" });
      return;
    }

    setSaving(true);

    const res = await fetch(
      editingSlug ? `/api/posts/${editingSlug}` : "/api/posts",
      {
        method: editingSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    setSaving(false);

    // ❌ DO NOT lie to UI
    if (!res.ok) {
      const err = await res.json();
      setToast({ type: "error", message: err.error || "Save failed" });
      return;
    }

    const data = await res.json();

    setPosts(prev =>
      editingSlug
        ? prev.map(p => (p.slug === editingSlug ? data : p))
        : [data, ...prev]
    );

    setToast({ type: "success", message: "Saved successfully ✨" });
    resetForm();
  }

  /* ---------- load edit from blog ---------- */
useEffect(() => {
  if (!mounted) return;

  const edit = localStorage.getItem("editPost");
  if (!edit) return;

  try {
    const p = JSON.parse(edit);

    setEditingSlug(p.slug);
    setForm({
      title: p.title || "",
      summary: p.summary || "",
      content: p.content || "",
    });

    localStorage.removeItem("editPost");
  } catch {
    localStorage.removeItem("editPost");
  }
}, [mounted]);

  /* ---------- hydration safety ---------- */
  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <PostForm
        form={form}
        setForm={setForm}
        saving={saving}
        editingSlug={editingSlug}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />

      <PostList
        posts={posts}
        onEdit={p => {
          setEditingSlug(p.slug);
          setForm({
            title: p.title || "",
            summary: p.summary || "",
            content: p.content || "",
          });
        }}
        onDelete={setDeleteSlug}
      />

      {toast && <Toast {...toast} />}

      {deleteSlug && (
        <DeleteModal
          onConfirm={async () => {
            const res = await fetch(`/api/posts/${deleteSlug}`, {
              method: "DELETE",
            });

            if (!res.ok) {
              setToast({ type: "error", message: "Delete failed" });
              return;
            }

            setPosts(p => p.filter(x => x.slug !== deleteSlug));
            setDeleteSlug(null);
          }}
          onCancel={() => setDeleteSlug(null)}
        />
      )}
    </div>
  );
}
