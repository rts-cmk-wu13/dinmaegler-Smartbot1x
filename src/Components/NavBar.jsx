import { Link } from "react-router";
import { useEffect } from "react";
import { setupGlassNavEffect } from "./GlassNavEffect";
import "../Styles/homecomp.css";

export default function NavBar() {
  useEffect(() => {
    const cleanup = setupGlassNavEffect(
      "nav.glass-nav",
      ".effect.filter",
      ".effect.text"
    );
    return cleanup;
  }, []);

  return (
    <nav className="glass-nav">
      <ul className="flex space-x-6 text-sm">
        <li>
          <Link to="/boliger" className="text-black hover:text-[#1a2a3a]">
            Boliger til salg
          </Link>
        </li>
        <li>
          <Link to="/maeglere" className="hover:text-[#1a2a3a]">
            Mæglere
          </Link>
        </li>
        <li>
          <Link to="/favoritter" className="hover:text-[#1a2a3a]">
            Mine favoritter
          </Link>
        </li>
        <li>
          <Link to="/Contact" className="hover:text-[#1a2a3a]">
            Kontakt os
          </Link>
        </li>
      </ul>

      <span className="effect filter"></span>
      {/* <span className="effect text active hidden">Boliger til salg</span> */}
    </nav>
  );
}
