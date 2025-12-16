"use client";

export default function Toast({ type, message }) {
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl glass
                  ${
                    type === "success"
                      ? "border border-cyan-400/30 text-cyan-300"
                      : "border border-red-400/30 text-red-300"
                  }`}
    >
      {message}
    </div>
  );
}
