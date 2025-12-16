import "./globals.css";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: "MiniBlog",
  description: "A calm, creator-friendly blog CMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <AppShell>
          <main className="flex-1 w-full">
            <div
              className="min-h-full w-full bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(129,140,248,0.15),transparent),radial-gradient(800px_500px_at_90%_10%,rgba(34,211,238,0.12),transparent),linear-gradient(to_bottom,#0b1220,#020617)]"
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
              </div>
            </div>
          </main>
        </AppShell>
      </body>
    </html>
  );
}
