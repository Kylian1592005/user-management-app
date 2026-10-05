export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        className="btn btn-circle btn-ghost btn-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        aria-label="Previous Page"
      >
        ❮
      </button>

      <div className="badge badge-neutral badge-lg py-3 px-4 text-xs font-semibold tracking-wider uppercase">
        Page {currentPage} / {totalPages}
      </div>

      <button
        className="btn btn-circle btn-ghost btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        aria-label="Next Page"
      >
        ❯
      </button>
    </div>
  );
}
