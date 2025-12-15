// app/error.js
"use client";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
      <pre className="mt-2 text-sm text-red-600">{String(error?.message)}</pre>
      <div className="mt-3">
        <button onClick={() => reset()} className="px-3 py-1 bg-red-600 text-white rounded">Try again</button>
      </div>
    </div>
  );
}
