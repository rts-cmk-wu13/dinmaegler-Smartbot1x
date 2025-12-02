import { Link } from "react-router";
import { FiHome, FiMapPin } from "react-icons/fi";
import villa from "/icons/villa.png";
import Skeleton from "../skeloton/skeleton.jsx";

export default function FeaturedHomes({ homes, loading, fmt }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Udvalgte Boliger
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            There are many variations of passages of Lorem Ipsum available{" "}
            <br />
            but the this in majority have suffered alteration in some
          </p>
        </div>

        {loading ? (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12">
            {homes.slice(0, 4).map((home) => (
              <Link
                key={home.id}
                to={`/Boliger/${home.id}`}
                className="block bg-white rounded-2xl shadow-lg hover:cursor-pointer  transition-all duration-300 overflow-hidden"
              >
                <article className="w-full h-full">
                  <img
                    src={
                      home.images?.[0]?.url ||
                      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                    alt={home.adress1}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <FiHome className="inline-block text-[#162A41]" />
                      <span>
                        {home.adress1}
                        {home.adress2 && (
                          <span className="text-gray-600">
                            {" "}
                            • {home.adress2}
                          </span>
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
                      <span className="text-[20px] font-semibold">
                        {home.type}
                      </span>
                      • Ejerudgift{" "}
                      <span className="">{fmt(home.cost)} kr.</span>
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
                        {home.rooms?.split("/")[0] || "4"} værelser •{" "}
                        {home.livingspace} m²
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
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link to="/boliger" className="inline-flex items-center">
            <button className="inline-flex items-center px-8 cursor-pointer py-4 bg-[#162A41] text-white text-lg font-semibold rounded-xl hover:bg-[#162A60] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Se alle boliger
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
