// app/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="animate-pulse space-y-2">
        <div className="h-6 w-72 bg-slate-200 rounded" />
        <div className="h-4 w-40 bg-slate-200 rounded" />
      </div>
    </div>
  );
}
