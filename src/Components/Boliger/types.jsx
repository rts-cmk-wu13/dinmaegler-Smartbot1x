import { useEffect, useMemo, useState } from "react";
import { fetchBoliger } from "../../api/boligerApi";

function formatDKK(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " kr.";
}

export default function PropertyFilters({ onFilterChange = () => {} }) {
  const [propertyType, setPropertyType] = useState("");
  const [types, setTypes] = useState([]);
  const [typesLoading, setTypesLoading] = useState(true);
  const [typesError, setTypesError] = useState(null);

  // base bounds (user can lower/raise these) and step
  const [baseMin, setBaseMin] = useState(0);
  const [baseMax, setBaseMax] = useState(12000000);
  const STEP = 10000;

  const [minPrice, setMinPrice] = useState(baseMin);
  const [maxPrice, setMaxPrice] = useState(baseMax);

  // prevent handles from crossing
  function onMinChange(v) {
    const value = Number(v);
    if (value > maxPrice - STEP) {
      setMinPrice(maxPrice - STEP);
    } else {
      setMinPrice(value);
    }
  }

  function onMaxChange(v) {
    const value = Number(v);
    if (value < minPrice + STEP) {
      setMaxPrice(minPrice + STEP);
    } else {
      setMaxPrice(value);
    }
  }

  // increase / decrease helpers for buttons (not used but kept for future use)
  function changeMin(delta) {
    const newVal = Math.max(baseMin, Math.min(baseMax, minPrice + delta));
    if (newVal > maxPrice - STEP) setMinPrice(maxPrice - STEP);
    else setMinPrice(newVal);
  }

  function changeMax(delta) {
    const newVal = Math.max(baseMin, Math.min(baseMax, maxPrice + delta));
    if (newVal < minPrice + STEP) setMaxPrice(minPrice + STEP);
    else setMaxPrice(newVal);
  }

  useEffect(() => {
    let mounted = true;
    setTypesLoading(true);
    fetchBoliger()
      .then((data) => {
        if (!mounted) return;
        const uniq = Array.from(
          new Set((data || []).map((h) => h.type).filter(Boolean))
        );
        setTypes(uniq.sort());
        setTypesLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setTypesError(err?.message || String(err));
        setTypesLoading(false);
      });
    return () => (mounted = false);
  }, []);

  // keep min/max inside base bounds when base changes
  useEffect(() => {
    setMinPrice((p) => Math.max(baseMin, p));
    setMaxPrice((p) => Math.min(baseMax, p));
  }, [baseMin, baseMax]);

  // call parent when filters change
  useEffect(() => {
    onFilterChange({ type: propertyType, min: minPrice, max: maxPrice });
  }, [propertyType, minPrice, maxPrice, onFilterChange]);

  // compute filled track background for styling the dual range
  const rangeStyle = useMemo(() => {
    const minPct =
      baseMax === baseMin
        ? 0
        : ((minPrice - baseMin) / (baseMax - baseMin)) * 100;
    const maxPct =
      baseMax === baseMin
        ? 100
        : ((maxPrice - baseMin) / (baseMax - baseMin)) * 100;
    return {
      background: `linear-gradient(90deg, #D3DEE8 ${minPct}%, #D3DEE8 ${minPct}%, #D3DEE8 ${maxPct}%, #D3DEE8 ${maxPct}% )`,
    };
  }, [minPrice, maxPrice, baseMin, baseMax]);

  // Scoped styles for range inputs
  const rangeStyles = `
    .dm-range { background: transparent; }
    .dm-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #C4C4C4;
      border: 2px solid white;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.02);
      cursor: pointer;
      margin-top: -8px;
    }
    .dm-range::-webkit-slider-runnable-track { background: transparent; }
    .dm-range::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #C4C4C4;
      border: 2px solid white;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.02);
      cursor: pointer;
    }
    .dm-range::-moz-range-track { background: transparent; }
    .dm-range:focus::-webkit-slider-thumb { box-shadow: 0 0 0 4px rgba(0,0,0,0.06); }
    .dm-range:focus::-moz-range-thumb { box-shadow: 0 0 0 4px rgba(0,0,0,0.06); }
  `;

  return (
    <section className="property-filters p-6">
      <style>{rangeStyles}</style>
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Søg efter dit drømmehus
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Property Type Filter */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700 mb-2">
            Ejendomstype
          </legend>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white py-3 pl-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-0"
            aria-label="Ejendomstype"
          >
            {typesLoading ? (
              <option value="">Indlæser...</option>
            ) : typesError ? (
              <option value="">Fejl ved indlæsning</option>
            ) : (
              <>
                <option value="">Ejendomstype</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </>
            )}
          </select>
          {typesError && (
            <p className="text-xs text-red-500 mt-1">{typesError}</p>
          )}
        </fieldset>

        {/* Price Range Filter */}
        <fieldset className="md:col-span-2">
          <legend className="text-sm font-medium text-gray-700 mb-3">
            Pris-interval
          </legend>

          <div className="relative h-10 px-2">
            {/* Range track */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 rounded-full" style={rangeStyle} />
            </div>

            {/* Range inputs */}
            <input
              aria-label="Minimum pris"
              type="range"
              min={baseMin}
              max={baseMax}
              step={STEP}
              value={minPrice}
              onChange={(e) => onMinChange(e.target.value)}
              className="absolute left-0 right-0 h-10 w-full appearance-none pointer-events-auto dm-range"
              style={{ zIndex: 3 }}
            />

            <input
              aria-label="Maksimum pris"
              type="range"
              min={baseMin}
              max={baseMax}
              step={STEP}
              value={maxPrice}
              onChange={(e) => onMaxChange(e.target.value)}
              className="absolute left-0 right-0 h-10 w-full appearance-none bg-transparent pointer-events-auto dm-range"
              style={{ zIndex: 2 }}
            />
          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatDKK(minPrice)}</span>
            <span>{formatDKK(maxPrice)}</span>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
