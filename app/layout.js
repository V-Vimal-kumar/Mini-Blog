// app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "MiniBlog",
  description: "A calm, creator-friendly blog CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">

        {/* Header */}
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

        {/* SINGLE MAIN AREA */}
<main className="flex-1 w-full">
  {/* App background surface */}
  <div
    className="min-h-full w-full
               bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(129,140,248,0.15),transparent),
                   radial-gradient(800px_500px_at_90%_10%,rgba(34,211,238,0.12),transparent),
                   linear-gradient(to_bottom,#0b1220,#020617)]"
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {children}
    </div>
  </div>
</main>



      </body>
    </html>
  );
}
