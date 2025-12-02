import React from "react";
import PropertyCard from "./PropertyCard";
import Skeleton from "../../Components/skeloton/skeleton";

/**
 * PropertyList displays a grid of property cards
 * @param {Array} homes
 * @param {boolean} loading
 */
export default function PropertyList({ homes, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <Skeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="property-list">
      {homes.map((home) => (
        <PropertyCard key={home.id} home={home} />
      ))}
    </div>
  );
}
