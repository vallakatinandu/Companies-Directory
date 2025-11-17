export default function Pagination({
  page,
  totalPages,
  pageSize,
  onPrev,
  onNext,
  onPageChange,
  onPageSizeChange,
}) {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-8">
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl shadow-sm">
        <span>Rows per page:</span>

        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="px-3 py-2 border rounded-xl bg-white shadow-sm"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1}
          className="px-4 py-2 bg-white border rounded-xl disabled:opacity-30"
        >
          ← Prev
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(p)}
              className={`px-4 py-2 rounded-xl ${
                p === page ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={onNext}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-white border rounded-xl disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
