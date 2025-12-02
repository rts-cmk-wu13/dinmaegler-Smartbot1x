import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaSkype,
} from "react-icons/fa";

const Detail1 = ({ className = "w-6 h-6" }) => (
  <img src="/icons/Detail1.svg" alt="billeder" className={className} />
);
const Detail2 = ({ className = "w-6 h-6" }) => (
  <img src="/icons/Detail2.svg" alt="dokumenter" className={className} />
);
const Detail3 = ({ className = "w-6 h-6" }) => (
  <img src="/icons/Detail3.svg" alt="location" className={className} />
);
const Detail4 = ({ className = "w-6 h-6" }) => (
  <img src="/icons/Detail4.svg" alt="favorit" className={className} />
);

export default function Details() {
  const { id } = useParams();
  const [home, setHome] = useState(null);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`https://dinmaegler.onrender.com/homes/${id}`);
        if (!res.ok) throw new Error("Failed to load home");
        const data = await res.json();
        if (!mounted) return;
        setHome(data);

        if (data.agentId) {
          try {
            const ares = await fetch(
              `https://dinmaegler.onrender.com/agents/${data.agentId}`
            );
            if (ares.ok) {
              const ad = await ares.json();
              if (mounted) setAgent(ad);
            }
          } catch (e) {}
        }
      } catch (err) {
        if (!mounted) return;
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [id]);

  const fmt = (n) => n?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-8 text-red-500">Error loading details: {error}</div>
    );
  if (!home) return <div className="p-8">No home found</div>;

  return (
    <div className="details-page bg-gray-100 min-h-screen">
      {/* Hero */}
      <div className="w-full h-[780px] ">
        <img
          src={home.images?.[0]?.url || "/assets/hero.png"}
          alt={home.adress1}
          className="w-full h-full "
        />
      </div>
      {/* white strip with address, icons and price */}
      <div className="mt-3.5 mx-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="font-semibold">{home.adress1}</div>
            <div className="text-sm text-gray-600">
              {home.postalcode} {home.city}
            </div>
          </div>

          <div className="flex items-center gap-4 ">
            <Detail1 className="w-10 h-10" />
            <Detail2 className="w-10 h-10" />
            <Detail3 className="w-10 h-10" />
            <Detail4 className="w-10 h-10" />
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">Kr. {fmt(home.price)}</div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 w-full max-w-6xl mx-auto" />

      {/* specs row */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Sagsnummer:</span>
              <span>{home.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Boligareal:</span>
              <span>{home.livingspace} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Grundareal:</span>
              <span>{home.lotsize || "-"} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rum/værelser:</span>
              <span>{home.rooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Antal Plan:</span>
              <span>3</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Kælder:</span>
              <span>{home.basementsize || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Byggeår:</span>
              <span>{home.built || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ombygget:</span>
              <span>{home.remodel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Energimærke:</span>
              <span>{home.energylabel || "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Opvarmning:</span>
              <span>1958</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Udbetaling:</span>
              <span>Kr. {fmt(home.payment || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Brutto ex. ejerudgift:</span>
              <span>Kr. {fmt(home.gross || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Netto ex. ejerudgift:</span>
              <span>Kr. {fmt(home.netto || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ejerudgift:</span>
              <span>Kr. {fmt(home.cost || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stikontakt:</span>
              <span>Kr. {fmt(5000)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* <hr className="border-t border-gray-300 w-full max-w-6xl mx-auto my-6" /> */}

      {/* main content: description + agent */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4">Beskrivelse</h3>
            <p className="text-gray-700 text-balance">{home.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ansvarlig mægler</h3>
            <div className="border w-[730px] h-[354px] border-gray-200 b-[#D3DEE8]">
              <div className="flex gap-5">
                <img
                  src={home.agent?.image?.url || "/icons/customer1.svg"}
                  alt={home.agent?.name}
                  className="w-[280px] h-[280px] object-cover"
                />
                <div>
                  <div className="font-semibold text-lg">
                    {home.agent?.name || "Peter Sørensen"}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {home.agent?.title || "Statsautoriseret ejendomsmægler"}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded bg-gray-50">
                      <FaPhone className="text-gray-700" />
                    </div>
                    <div className="text-sm text-gray-800">
                      {home.agent?.phone || "+45 7070 4012"}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-gray-50">
                      <FaEnvelope className="text-gray-700" />
                    </div>
                    <div className="text-sm text-gray-800">
                      {home.agent?.email || "peter@dinmaegler.com"}
                    </div>
                  </div>

                  <div className="relative left-[-301px] bg-[#162A41] w-[134px] h-[40px] flex items-center gap-2">
                    <a href="#" className=" text-white px-2 py-1 rounded mr-1">
                      <FaInstagram size={14} />
                    </a>
                    <a href="#" className=" text-white px-2 py-1 rounded mr-1">
                      <FaLinkedinIn size={14} />
                    </a>
                    <a href="#" className=" text-white px-2 py-1 rounded">
                      <FaSkype size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
