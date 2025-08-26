/* import "../Styles/glassnavdemo.css"; */
import { NavLink, useLocation } from "react-router";

function NavItem({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li className={isActive ? "active" : ""}>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}

export default function NavBar() {
  return (
    <nav className="glass-nav-demo ">
      <ul className="flex gap-4 ">
        <NavItem to="/boliger">Boliger til salg</NavItem>
        <NavItem to="/maeglere">Mæglere</NavItem>
        <NavItem to="/favoritter">Mine favoritter</NavItem>
        <NavItem to="/Contact">Kontakt os</NavItem>
      </ul>
    </nav>
  );
}
