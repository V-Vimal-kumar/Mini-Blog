"use client";

import { useEffect, useRef, useState } from "react";
import PostForm from "@/components/admin/PostForm";
import PostList from "@/components/admin/PostList";
import Toast from "@/components/admin/Toast";
import DeleteModal from "@/components/admin/DeleteModel";
import { useSearchParams } from "next/navigation";

export default function AdminPage() {
  const formRef = useRef(null);
  const searchParams = useSearchParams();
  const editSlugFromUrl = searchParams.get("edit");


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

    const data = await res.json();

    setPosts(prev =>
      editingSlug
        ? prev.map(p => (p.slug === editingSlug ? data : p))
        : [data, ...prev]
    );

    setToast({ type: "success", message: "Saved successfully ✨" });
    resetForm();
  }

  useEffect(() => {
    if (!editSlugFromUrl) return;

    async function loadPostForEdit() {
      const res = await fetch(`/api/posts/${editSlugFromUrl}`);
      if (!res.ok) return;

      const post = await res.json();

      setEditingSlug(editSlugFromUrl);
      setForm({
        title: post.title || "",
        summary: post.summary || "",
        content: post.content || "",
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    loadPostForEdit();
  }, [editSlugFromUrl]);


  return (
    <div className="max-w-5xl mx-auto space-y-16">

      {/* 👇 wrap PostForm with ref */}
      <div ref={formRef}>
        <PostForm
          form={form}
          setForm={setForm}
          saving={saving}
          editingSlug={editingSlug}
          onSubmit={handleSubmit}
          onReset={resetForm}
        />
      </div>

      <PostList
        posts={posts}
        onEdit={p => {
          window.history.pushState({}, "", `/admin?edit=${p.slug}`);
          setEditingSlug(p.slug);
          setForm({
            title: p.title || "",
            summary: p.summary || "",
            content: p.content || "",
          });

          window.scrollTo({ top: 0, behavior: "smooth" });
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
