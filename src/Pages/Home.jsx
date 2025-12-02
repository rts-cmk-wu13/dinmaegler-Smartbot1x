import React, { useEffect, useState } from "react";
import /* Link */ "react-router";
import Hero from "../Components/Home/Hero.jsx";
import HomeComp from "../Components/Home/homecomp.jsx";
import FeaturedHomes from "../Components/Home/FeaturedHomes";
import Newsletter from "../Components/Home/Newsletter";
import AgentsGrid from "../Components/Home/AgentsGrid";
import { FaLongArrowAltRight, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../Styles/newsletter.css";
import "../Styles/agent.css";
import AppStore from "../Components/appstore.jsx";

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
      <FeaturedHomes homes={homes} loading={loading} fmt={fmt} />
      <Newsletter />
      <AgentsGrid agents={agents} />
      <section>
        <AppStore />
      </section>{" "}
    </div>
  );
}
