import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400 to-cyan-400 flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/20">
              MB
            </div>
            <div>
              <div className="text-lg font-semibold tracking-wide">MiniBlog</div>
              <div className="text-xs text-slate-400">
                Calm writing space
              </div>
            </div>
          </Link>

          <Link
            href="/admin"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400
                       text-black font-medium shadow-lg shadow-cyan-500/30
                       hover:scale-105 transition"
          >
            New Post
          </Link>
        </div>
      </div>
    </header>
  );
}
