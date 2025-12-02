import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaLinkedin, FaSkype, FaInstagram } from "react-icons/fa";
import { findAgentById } from "../api/agentsApi";

export default function ContactAgent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    let mounted = true;
    async function loadAgent() {
      try {
        setLoading(true);
        const foundAgent = await findAgentById(id);
        if (mounted) {
          setAgent(foundAgent);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (id) loadAgent();
    return () => {
      mounted = false;
    };
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("contact form submitted", { agentId: id, ...form });

    alert("Besked sendt til mægler. Vi kontakter dig snarest.");
    setForm({ name: "", email: "", message: "" });
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <p>Indlæser mægler...</p>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <p>Mægler ikke fundet.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-block px-4 py-2 bg-[#162A41] text-white rounded"
        >
          Tilbage
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Agent Information Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="grid md:grid-cols-2">
          {/* Agent Photo with Social Media */}
          <div className="relative">
            <img
              src={agent.image?.url || "/assets/placeholder-agent.png"}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 flex space-x-2 p-2 bg-[#162A41]">
              <a href="#" className="text-white p-2">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="text-white p-2">
                <FaLinkedin size={16} />
              </a>
              <a href="#" className="text-white p-2">
                <FaSkype size={16} />
              </a>
            </div>
          </div>

          {/* Agent Info */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
            <p className="text-gray-600 mb-4">{agent.title}</p>

            <div className="space-y-3">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <a href={`tel:${agent.phone}`} className="text-gray-700">
                  {agent.phone}
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a href={`mailto:${agent.email}`} className="text-gray-700">
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* About Agent */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-bold mb-2 pb-2 border-b-2 border-gray-200 inline-block">
            Om {agent.name}
          </h2>
          <div className="mt-4 text-gray-600">
            <p className="mb-4">
              {agent.description ||
                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."}
            </p>
            <p>
              {agent.description
                ? ""
                : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form by injected humour."}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gray-200 inline-block">
            Kontakt {agent.name}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Navn
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Indtast navn"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Indtast email"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emne
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="Hvad drejer din henvendelse sig om?"
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Besked
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Skriv din besked her..."
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-5 py-2 bg-[#162A41] text-white font-medium rounded hover:bg-[#0f1d2d]"
              >
                Send besked
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Search Property</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 focus:outline-none"
              />
              <button className="bg-white px-4 py-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div> */}
    </div>
    /*     </div> */
  );
}
