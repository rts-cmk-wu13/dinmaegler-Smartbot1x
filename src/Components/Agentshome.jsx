import { useState, useEffect } from "react";
import "../styles/card.css";
import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";
import { fetchAgents } from "../api/agentsApi";

export default function Agentshome() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAgents = async () => {
      try {
        // Only get the first 3 agents for the homepage
        const data = await fetchAgents();
        setAgents(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error("Error loading agents for homepage:", error);
        setLoading(false);
      }
    };

    loadAgents();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading agents...</div>;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
          <p className="mt-4 text-xl text-gray-500">
            Meet our experienced real estate agents
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:transform hover:scale-105"
              onClick={() => navigate(`/contact-agent/${agent.id}`)}
            >
              <img
                src={
                  agent.image?.url ||
                  "https://via.placeholder.com/350x250?text=Agent"
                }
                alt={agent.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <p className="text-gray-600">{agent.title}</p>

                <div className="mt-4 flex items-center text-gray-500">
                  <FaEnvelope className="mr-2" />
                  <span>{agent.email}</span>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-gray-500">{agent.phone}</div>
                  {agent.linkedin && (
                    <a
                      href={agent.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/maegler")}
            className="bg-[#162A41] text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            View All Agents
          </button>
        </div>
      </div>
    </div>
  );
}
