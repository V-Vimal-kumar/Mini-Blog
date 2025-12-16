"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure client-only render
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center font-bold text-black">
              MB
            </div>
            <div className="text-lg font-semibold">MiniBlog</div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
  <Link
    href="/admin"
    className="px-4 py-2 sm:px-5 rounded-full
               bg-gradient-to-r from-indigo-400 to-cyan-400
               text-black text-sm font-medium shadow-lg
               hover:scale-105 transition"
  >
    New Post
  </Link>

  {session && (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-4 py-2 sm:px-5 rounded-full
                 border border-white/20 text-sm
                 hover:bg-white/10 transition"
    >
      Logout
    </button>
  )}
</div>

        </div>
      </div>
    </header>
  );
}
