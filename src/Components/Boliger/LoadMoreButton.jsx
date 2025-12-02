/**
 * LoadMoreButton handles
 * @param {boolean} hasMore
 * @param {boolean} loadingMore
 * @param {Function} onLoadMore
 * @param {Function} onShowLess
 */
export default function LoadMoreButton({
  hasMore,
  loadingMore,
  onLoadMore,
  onShowLess,
  error,
}) {
  return (
    <div className="mt-8 text-center">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {hasMore ? (
        <button
          onClick={onLoadMore}
          className="px-6 py-2 bg-[#162A41] text-white rounded-md cursor-pointer"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Show more homes"}
        </button>
      ) : (
        <button
          onClick={onShowLess}
          className="px-6 py-2 bg-[#162A41] text-white rounded-md cursor-pointer"
        >
          Show less homes
        </button>
      )}
    </div>
  );
}
