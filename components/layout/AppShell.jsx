"use client";

import Header from "@/components/layout/Header";
import Providers from "@/components/providers/SessionProvider";

export default function AppShell({ children }) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  );
}
