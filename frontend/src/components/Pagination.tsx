// src/components/Pagination.tsx
export default function Pagination({
  current,
  total,
  onPage,
}: {
  current: number;
  total: number;
  onPage: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => onPage(current - 1)} disabled={current <= 1} className="px-3 py-1 border rounded disabled:opacity-40">
        Prev
      </button>
      <div className="text-sm">
        Page <span className="font-medium">{current}</span> of <span className="font-medium">{total}</span>
      </div>
      <button onClick={() => onPage(current + 1)} disabled={current >= total} className="px-3 py-1 border rounded disabled:opacity-40">
        Next
      </button>
    </div>
  );
}
