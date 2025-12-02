import { Link } from "react-router";
import { FiHome, FiMapPin } from "react-icons/fi";
import villa from "/icons/villa.png";

/**
 * @param {Object} home
 */
export default function PropertyCard({ home }) {
  const fmt = (num) => num?.toLocaleString() || "0";

  return (
    <Link
      to={`/Boliger/${home.id}`}
      className="w-[540px] h-[auto] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <article className="w-[540px] h-[80%]">
        <img
          src={
            home.images?.[0]?.url ||
            "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt={home.adress1}
          loading="lazy"
          decoding="async"
          className="w-full h-[225px] "
        />

        <div className="ml-6 ">
          <h3 className="text-xl font-bold text-gray-900 flex items-center ">
            <FiHome className="inline-block text-[#162A41]" />
            <span>
              {home.adress1}
              {home.adress2 && (
                <span className="text-gray-600"> • {home.adress2}</span>
              )}
            </span>
          </h3>
          <div className="flex items-center text-gray-600 mb-3 gap-2">
            <FiMapPin className="inline-block text-[#162A41]" />
            <span>
              {home.postalcode} {home.city}
            </span>
          </div>
          <div className="flex items-center text-[#333] gap-2 mb-4">
            <img src={villa} alt="type" className="w-5 h-5" />
            <span className="text-[20px] font-semibold">{home.type}</span>•
            Ejerudgift <span className="">{fmt(home.cost)} kr.</span>
          </div>
        </div>

        <div className="border-t px-6 text-[#D3DEE8] py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center rounded-sm text-white font-bold"
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
            </div>

            <div className="text-[16px] text-[#333]">
              {home.rooms?.split("/")[0] || "4"} værelser • {home.livingspace}{" "}
              m²
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">
              Kr. {fmt(home.price)}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
