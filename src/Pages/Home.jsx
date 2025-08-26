import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Hero from "../Components/Hero.jsx";
import HomeComp from "../Components/homecomp.jsx";
import { SlEnergy } from "react-icons/sl";
import { FaLongArrowAltRight } from "react-icons/fa";
/* import Loading from "../Components/Loading.jsx"; */
import { FiHome, FiMapPin, FiInfo } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import Dkk from "/icons/dkk.png";
import rooms from "/icons/room.png";
import villa from "/icons/villa.png";
import "../Styles/newsletter.css";
import "../Styles/agent.css";
import { FaLinkedin } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import AppStore from "../Components/appstore.jsx";

function Home() {
  const [homes, setHomes] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await fetch("https://dinmaegler.onrender.com/Homes");
        const data = await response.json();
        setHomes(data);
      } catch (error) {
        console.error("Error fetching homes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await fetch("https://dinmaegler.onrender.com/agents");
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchHomes();
    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <HomeComp />
      {/* Boliger Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Udvalgte Boliger
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              There are many variations of passages of Lorem Ipsum available but
              the this in majority have suffered alteration in some
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 xl:gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden /* animate-pulse */"
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-64 bg-gray-200" />
                    <div className="absolute top-4 left-4 h-7 w-16 bg-gray-300 rounded-full" />
                    <div className="absolute top-4 right-4 h-8 w-24 bg-gray-300 rounded-full" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="h-6 w-2/3 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-1/2 bg-gray-100 rounded mb-2" />
                        <div className="h-4 w-1/3 bg-gray-100 rounded" />
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="h-4 w-1/2 bg-gray-100 rounded" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 w-1/3 bg-gray-100 rounded" />
                        <div className="h-8 w-24 bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 xl:gap-12 ">
              {homes.slice(0, 4).map((home) => (
                <div
                  key={home.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:transform "
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        home.images?.[0]?.url ||
                        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800"
                      }
                      alt={home.adress1}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className="absolute top-4 left-4 text-[#162A41] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
                      style={{
                        background:
                          home.energylabel === "A"
                            ? "radial-gradient(circle, #01f900, #01fb03, #01fc05, #00fe08, #00ff0b)"
                            : home.energylabel === "B"
                            ? "#F2C94C"
                            : home.energylabel === "C"
                            ? "#F2994A"
                            : "radial-gradient(circle, #f93600, #f54900, #f25802, #ee6508, #eb7012)",
                      }}
                    >
                      {home.energylabel}
                      <SlEnergy />
                    </div>
                    <div
                      className="absolute top-4 right-4 text-white px-4 py-2 rounded-full font-bold"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #000000, #222222, #3f3f3f, #5e5e5e, #7f7f7f)",
                      }}
                    >
                      Kr.{" "}
                      {home.price
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <FiHome className="inline-block text-[#162A41] mr-1" />
                          {home.adress1}
                          {home.adress2 && (
                            <span className="text-gray-600">
                              {" "}
                              • {home.adress2}
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2 gap-2">
                          <FiMapPin className="inline-block text-[#162A41]" />
                          <span>
                            {home.postalcode} {home.city}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 gap-2">
                          <img
                            src={villa}
                            alt="house types"
                            className="inline-block text-[#162A41]"
                          />
                          <span>{home.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-600 flex gap-4">
                          <span className="flex items-center gap-1 font-medium">
                            <img
                              src={rooms}
                              alt="rooms"
                              className="inline-block "
                            />
                            {home.rooms?.split("/")[0] || "3"} værelser
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <FiHome className="inline-block text-[#162A41]" />
                            {home.livingspace} m²
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600 flex items-center gap-2">
                          <img
                            src={Dkk}
                            alt="DKK currency icon"
                            className="inline-block w-10"
                          />
                          <span className="text-gray-500">Ejerudgift:</span>
                          <span className="font-semibold ml-1">
                            {home.cost
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                            kr/md
                          </span>
                        </div>
                        <button className="bg-[#162A41] text-white px-6 py-2 cursor-pointer rounded-lg hover:bg-[#162A60] transition-colors font-medium flex items-center gap-2">
                          <FiInfo className="inline-block text-white" />
                          Se detaljer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
      {/* Agents Section */}
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
              className="inline-flex items-center px-8 py-4 bg-[#162A41] text-white text-lg font-semibold rounded-xl hover:bg-[#162A60] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              to="/maeglere"
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

export default Home;
