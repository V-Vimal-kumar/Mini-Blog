"use client";
import { useEffect, useState } from "react";
import PostForm from "@/components/admin/PostForm";
import PostList from "@/components/admin/PostList";
import Toast from "@/components/admin/Toast";
import DeleteModal from "@/components/admin/DeleteModel";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", summary: "", content: "" });
  const [saving, setSaving] = useState(false);
  const [editingSlug, setEditingSlug] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    fetch("/api/posts").then(r => r.json()).then(setPosts);
  }, []);

  function resetForm() {
    setForm({ title: "", summary: "", content: "" });
    setEditingSlug(null);
    setSaving(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(
      editingSlug ? `/api/posts/${editingSlug}` : "/api/posts",
      {
        method: editingSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    setPosts(prev =>
      editingSlug
        ? prev.map(p => (p.slug === editingSlug ? data : p))
        : [data, ...prev]
    );

    setToast({ type: "success", message: "Saved successfully ✨" });
    setTimeout(() => setToast(null), 3000);
    resetForm();
  }

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
          setForm(p);
        }}
        onDelete={setDeleteSlug}
      />

      {toast && <Toast {...toast} />}

      {deleteSlug && (
        <DeleteModal
          onConfirm={async () => {
            await fetch(`/api/posts/${deleteSlug}`, { method: "DELETE" });
            setPosts(p => p.filter(x => x.slug !== deleteSlug));
            setDeleteSlug(null);
          }}
          onCancel={() => setDeleteSlug(null)}
        />
      )}
    </div>
  );
}
