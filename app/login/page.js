"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setToast({ type: "error", message: "Invalid credentials" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setToast({ type: "success", message: "Welcome back ✨" });
    setTimeout(() => router.push("/admin"), 800);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-10 w-full max-w-md space-y-6 shadow-2xl"
      >
        <h1 className="text-3xl font-semibold text-center
                       bg-gradient-to-r from-indigo-400 to-cyan-400
                       bg-clip-text text-transparent">
          Admin Login
        </h1>

        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full p-4 rounded-2xl"
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-4 rounded-2xl"
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-full
                     bg-gradient-to-r from-indigo-400 to-cyan-400
                     text-black font-medium shadow-lg hover:scale-105 transition"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 glass px-6 py-4 rounded-2xl
                      ${
                        toast.type === "success"
                          ? "border border-cyan-400/30 text-cyan-300"
                          : "border border-red-400/30 text-red-300"
                      }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
