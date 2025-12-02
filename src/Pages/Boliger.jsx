import { useEffect, useState, useCallback, useRef } from "react";
import Heading from "../Components/Smallhero.jsx";
import { fetchBoliger } from "../api/boligerApi";
import PropertyFilters from "../Components/Boliger/types.jsx";
import PropertyList from "../Components/Boliger/PropertyList";
import LoadMoreButton from "../Components/Boliger/LoadMoreButton";

export default function Boliger() {
  // State variables
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ type: "", min: 0, max: Infinity });

  // Pagination state
  const [limit] = useState(8);
  const [start, setStart] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Cache for API results
  const cacheRef = useRef(new Map());
  const debounceRef = useRef(null);

  // Load initial data
  useEffect(() => {
    loadPage(0, filter);
  }, []);

  // Handle filter changes with debounce
  const handleFilterChange = useCallback((f) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setFilter(f);
      setStart(0);
      setHasMore(true);
      cacheRef.current.clear();
      loadPage(0, f);
    }, 350);
  }, []);

  // Load properties with pagination and filtering
  async function loadPage(pageStart = 0, f = filter) {
    // Build query parameters
    const params = {};
    params._limit = limit;
    params._start = pageStart;
    if (f?.type) params.type_eq = f.type;
    if (Number.isFinite(f?.min)) params.price_gte = f.min;
    if (Number.isFinite(f?.max) && f.max !== Infinity) params.price_lte = f.max;

    const cacheKey = JSON.stringify(params);

    try {
      // Set appropriate loading state
      if (pageStart === 0) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      // Check cache first
      if (cacheRef.current.has(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        if (pageStart === 0) setHomes(cached.slice());
        else setHomes((prev) => [...prev, ...cached.slice()]);
        setHasMore(cached.length === limit);
        return;
      }

      // Fetch data from API
      const data = await fetchBoliger(params);
      cacheRef.current.set(cacheKey, data);

      // Update state based on pagination
      if (pageStart === 0) setHomes(data);
      else setHomes((prev) => [...prev, ...data]);

      setHasMore(data.length === limit);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Handle load more button click
  const handleLoadMore = async () => {
    const nextStart = start + limit;
    setStart(nextStart);
    await loadPage(nextStart);
  };

  // Handle show less button click
  const handleShowLess = () => {
    setStart(0);
    loadPage(0);
  };

  return (
    <section className="boliger-page p-8">
      <Heading h1="Boliger Til Salg" className="mb-8" />

      {error && <div className="text-red-500 text-center">Error: {error}</div>}

      {/* Property Filters */}
      <PropertyFilters onFilterChange={handleFilterChange} />

      {/* Property List */}
      <PropertyList homes={homes} loading={loading} />

      {/* Pagination Controls */}
      <LoadMoreButton
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        onShowLess={handleShowLess}
        error={error}
      />
    </section>
  );
}
