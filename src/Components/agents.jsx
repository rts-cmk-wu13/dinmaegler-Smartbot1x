import { useState, useEffect } from "react";
import "../styles/loader.css";

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

  if (loading) {
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
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
      {agents.map((agent) => (
        <div
          key={agent.id}
          style={{
            flex: "1 0 30%",
            boxSizing: "border-box",
            marginBottom: "24px",
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "16px",
            minWidth: "250px",
            maxWidth: "32%",
          }}
        >
          <img
            src={agent.image?.url}
            alt={agent.name}
            style={{ width: "350px", borderRadius: "8px" }}
          />
          <h3>{agent.name}</h3>
          <p>{agent.email}</p>
          <p>{agent.phone}</p>
        </div>
      ))}
    </div>
  );
}
