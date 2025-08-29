import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Hero from "../Components/Home/Hero.jsx";
import HomeComp from "../Components/Home/homecomp.jsx";
import { FaLongArrowAltRight, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FiHome, FiMapPin } from "react-icons/fi";
import villa from "/icons/villa.png";
import "../Styles/newsletter.css";
import "../Styles/agent.css";
import AppStore from "../Components/appstore.jsx";
import Skeleton from "../Components/skeloton/skeleton.jsx";

export default function Home() {
  const [homes, setHomes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomes() {
      try {
        const res = await fetch("https://dinmaegler.onrender.com/Homes");
        const data = await res.json();
        setHomes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    async function loadAgents() {
      try {
        const res = await fetch("https://dinmaegler.onrender.com/agents");
        const data = await res.json();
        setAgents(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadHomes();
    loadAgents();
  }, []);

  const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <HomeComp />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Udvalgte Boliger
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Udvalgte boliger fra vores portefølje.
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
                <article
                  key={home.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
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

      <section className="newsletter-section flex  items-center justify-center bg-gray-100 py-10">
        <p>
          Tilmeld dig vores nyhedsbrev og <br /> hold dig opdateret på
          boligmarkedet
        </p>
        <div className="relative w-full max-w-md mt-4 ">
          <div className="newsletter-input-wrapper">
            <input
              type="email"
              id="newsletter-email"
              placeholder="Indtast din email"
              className="w-[540px] h-[74px] rounder-[4px] bg-[#FFF] focus:outline-none focus:ring-2 focus:ring-[#162A41] placeholder:items-center"
            />
            <span className="arrow-icon">
              <FaLongArrowAltRight />
            </span>
          </div>
        </div>
      </section>

      <section className="agents-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#162A41] mb-4">
              Mød vores engagerede medarbejdere
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Din Mægler er garant for altid veluddannet assistance i dit
              boligsalg.
              <br />
              Kontakt en af vores medarbejdere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {agents.slice(0, 3).map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center"
              >
                <img
                  src={
                    agent.image?.url ||
                    "https://via.placeholder.com/300x300?text=Agent"
                  }
                  alt={agent.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 w-full text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {agent.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{agent.title}</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href={`mailto:${agent.email}`}
                      className="text-[#162A41] text-xl"
                      aria-label="Email"
                    >
                      <FaEnvelope />
                    </a>
                    <a
                      href={agent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#162A41] text-xl"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/maeglere"
              className="inline-flex items-center px-8 py-4 bg-[#162A41] text-white text-lg font-semibold rounded-xl hover:bg-[#162A60] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Se alle mæglere
            </Link>
          </div>
        </div>
      </section>

      <section>
        <AppStore />
      </section>
    </div>
  );
}
