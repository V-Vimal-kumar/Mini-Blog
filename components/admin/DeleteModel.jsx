"use client";

export default function DeleteModel({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="glass rounded-3xl p-8 max-w-sm w-full">
        <h3 className="text-xl font-semibold text-slate-100 mb-3">
          Delete post?
        </h3>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 rounded-full
                       bg-gradient-to-r from-red-400 to-pink-500 text-black"
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-full border border-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
