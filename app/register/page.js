"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setToast({ type: "error", message: data.error || "Failed" });
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
      return;
    }

    // ✅ auto-login
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setToast({ type: "success", message: "Account created!" });
    setTimeout(() => router.push("/admin"), 800);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="glass rounded-3xl p-10 w-full max-w-md space-y-6 shadow-2xl"
      >
        <h1
          className="text-3xl font-semibold text-center
                     bg-gradient-to-r from-indigo-400 to-cyan-400
                     bg-clip-text text-transparent"
        >
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full p-4 rounded-2xl"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-4 rounded-2xl"
          required
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded-full
                     bg-gradient-to-r from-indigo-400 to-cyan-400
                     text-black font-medium shadow-lg
                     hover:scale-105 transition"
        >
          {loading ? "Creating…" : "Register"}
        </button>
      </form>

      {toast && (
        <div
          className={`fixed right-6 top-[5.5rem] z-50
                glass px-6 py-4 rounded-2xl
                ${toast.type === "success"
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
