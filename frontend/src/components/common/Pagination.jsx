import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
      >
        Prev
      </button>
      {pages.map((p, idx) => (
        <React.Fragment key={p}>
          {idx > 0 && pages[idx - 1] !== p - 1 && <span className="px-1 text-gray-400">...</span>}
          <button
            type="button"
            onClick={() => onPageChange(p)}
            className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
              p === page ? 'bg-brand-blue text-white' : 'border border-gray-200 text-brand-dark hover:border-brand-blue'
            }`}
          >
            {p}
          </button>
        </React.Fragment>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
