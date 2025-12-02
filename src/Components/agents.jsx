import { useState, useEffect } from "react";
import "../styles/loader.css";
import "../styles/card.css";
import Heading from "./Smallhero";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import { fetchAgents } from "../api/agentsApi";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const data = await fetchAgents();
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading agents:", error);
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  return (
    <>
      <Heading h1="Medarbejdere i Roskilde" className="mb-8" />
      <div className="agents-container ">
        {agents.map((agent) => (
          <div
            className="card cursor-pointer"
            key={agent.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/contact-agent/${agent.id}`)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(`/contact-agent/${agent.id}`)
            }
          >
            <img
              src={
                agent.image?.url ||
                "https://via.placeholder.com/350x250?text=Agent"
              }
              alt={agent.name}
              style={{ width: "350px", borderRadius: "8px" }}
            />
            <h3>{agent.name}</h3>
            <p className="text-gray-600 mb-4">{agent.title}</p>
            <div className="flex justify-center gap-4">
              <a
                href={`mailto:${agent.email}`}
                className="ikons text-[#000000] text-xl"
                aria-label="Email"
                onClick={(e) => e.stopPropagation()}
              >
                <FaEnvelope />
              </a>
              <a
                href={agent.linkedin}
                className="ikons text-[#162A41] text-xl"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedin />
              </a>
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
