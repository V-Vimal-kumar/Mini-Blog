"use client";

import { useEffect, useState } from "react";

export default function Toast({
  type = "success",
  message,
  duration = 3000,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible || !message) return null;

  return (
    <div
      className={`fixed right-6 top-[calc(4rem+1rem)]
                  z-50 glass px-6 py-4 rounded-2xl
                  shadow-lg transition-all
                  ${
                    type === "success"
                      ? "border border-cyan-400/40 text-cyan-300"
                      : "border border-red-400/40 text-red-300"
                  }`}
    >
      {message}
    </div>
  );
}
