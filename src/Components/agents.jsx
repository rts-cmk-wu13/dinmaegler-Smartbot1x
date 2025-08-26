import { useState, useEffect } from "react";
import "../styles/loader.css";
import "../styles/card.css";
import Heading from "./Smallhero";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("https://dinmaegler.onrender.com/agents");
        const data = await response.json();
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <>
      <Heading h1="Medarbejdere i Roskilde" className="mb-8" />
      <div className="agents-container ">
        {agents.map((agent) => (
          <div className="card" key={agent.id}>
            <img
              src={agent.image?.url}
              alt={agent.name}
              style={{ width: "350px", borderRadius: "8px" }}
            />
            <h3>{agent.name}</h3>
            <p className="text-gray-600 mb-4">{agent.title}</p>
            <div className="flex justify-center gap-4">
              <Link
                to={`mailto:${agent.email}`}
                className="ikons text-[#000000] text-xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </Link>
              <Link
                to={agent.linkedin}
                className="ikons text-[#162A41] text-xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

{
  /* <div className="card">
        <h2>CARD</h2>
      </div> */
}
/*  if (loading) {
    return (
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div className="text">Loading...</div>
      </div>
    );
  } */
