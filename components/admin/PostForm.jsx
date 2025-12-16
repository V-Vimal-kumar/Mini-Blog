"use client";

export default function PostForm({
  form,
  setForm,
  saving,
  editingSlug,
  onSubmit,
  onReset,
}) {
  return (
    <section className="glass rounded-[2rem] shadow-2xl shadow-indigo-500/20
                        flex flex-col max-h-[680px] w-full mx-auto">
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <h2 className="text-3xl font-semibold
                       bg-gradient-to-r from-indigo-400 to-cyan-400
                       bg-clip-text text-transparent">
          {editingSlug ? "Refine your story ✍️" : "Create something beautiful ✨"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto px-8 space-y-5">
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            placeholder="Post title"
            className="w-full p-4 text-lg rounded-2xl"
          />

          <input
            value={form.summary}
            onChange={e => setForm({ ...form, summary: e.target.value })}
            placeholder="Short summary (optional)"
            className="w-full p-4 rounded-2xl"
          />

          <textarea
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            placeholder="Write freely…"
            className="w-full min-h-[220px] resize-none
                       p-5 rounded-2xl text-sm"
          />
        </div>

        <div className="px-8 py-6 border-t border-white/10
                        flex justify-end gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-10 py-3 rounded-full
                       bg-gradient-to-r from-indigo-400 to-cyan-400
                       text-black font-medium"
          >
            {saving ? "Saving…" : editingSlug ? "Update Post" : "Publish Post"}
          </button>

          <button
            type="button"
            onClick={onReset}
            className="px-10 py-3 rounded-full
                       border border-white/20"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
