import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function AgentsGrid({ agents }) {
  const navigate = useNavigate();

  return (
    <section className="agents-section py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#162A41] mb-4">
            Mød vores engagerede medarbejdere
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Din Mægler er garant for altid veluddannet assistance i dit
            boligmarked.
            <br />
            Kontakt en af vores medarbejdere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {agents.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              onClick={() => navigate(`/contact-agent/${agent.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/contact-agent/${agent.id}`)
              }
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center cursor-pointer"
            >
              <img
                src={
                  agent.image?.url ||
                  "https://via.placeholder.com/300x300?text=Agent"
                }
                alt={agent.name}
                className="w-full h-64 object-scale-down"
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href={agent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#162A41] text-xl"
                    aria-label="LinkedIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/maeglere"
            className="inline-flex items-center px-8 py-4 bg-[#162A41] text-white text-lg font-semibold rounded-xl hover:bg-[#162A60] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Se alle mæglere
          </a>
        </div>
      </div>
    </section>
  );
}
