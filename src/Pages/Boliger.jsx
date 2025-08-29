import { useEffect, useState } from "react";
import Heading from "../Components/Smallhero.jsx";
import { fetchBoliger } from "../api/boligerApi";
import { SlEnergy } from "react-icons/sl";
import Loading from "../Components/Loading.jsx";

export default function Boliger() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBoliger()
      .then((data) => {
        setHomes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="boliger-page p-8">
      <Heading h1="Boliger Til Salg" className="mb-8" />
      {loading && <Loading />}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      <div className="homes-list grid grid-cols-1 md:grid-cols-2 gap-8">
        {homes.map((home) => (
          <div
            key={home.id}
            className="home-card bg-white rounded-xl overflow-hidden shadow border border-gray-100"
          >
            <img
              src={
                home.images && home.images[0]?.formats?.thumbnail?.url
                  ? home.images[0].formats.thumbnail.url
                  : home.images && home.images[0]?.url
                  ? home.images[0].url
                  : "https://via.placeholder.com/400x225?text=No+Image"
              }
              alt={home.adress1}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="font-bold text-xl mb-2">
                {home.adress1}
                {home.adress2 ? ` • ${home.adress2}` : ""}
              </h2>
              <div className="text-gray-500 mb-2">
                {home.postalcode} {home.city}
              </div>
              <div className="font-semibold mb-2">
                {home.type} &bull; Ejerudgift: {home.cost?.toLocaleString()} kr.
              </div>
              <div className="flex items-center mb-2 relative">
                <div
                  className="absolute top-0 left-0 text-[#ffffff] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                  style={{
                    background:
                      home.energylabel === "A"
                        ? "#10AC84"
                        : home.energylabel === "B"
                        ? "#F2C94C"
                        : home.energylabel === "C"
                        ? "#F2994A"
                        : "red",
                  }}
                >
                  {home.energylabel}
                  <SlEnergy />
                </div>
                <span className="ml-32">
                  {home.rooms?.split("/")[0]} værelser &bull; {home.livingspace}{" "}
                  m²
                  <div className="font-bold text-[#333] text-lg mt-2">
                    Kr. {home.price?.toLocaleString()}
                  </div>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
