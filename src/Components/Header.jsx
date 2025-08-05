import { IoIosSend, IoIosCall } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "/public/icons/Frame.svg";
export default function Header() {
  return (
    <header>
      {/* Top bar info */}
      <div className="bg-[#1a2a3a] text-white text-sm">
        <div className="container mx-auto flex justify-between items-center /* py-2 px-4 */ h-16">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <IoIosSend />
              <a href="mailto:4000@dinmaegler.com" className="hover:underline">
                4000@dinmaegler.com
              </a>
            </span>
            <span className="flex items-center space-x-1">
              <IoIosCall />
              <a href="tel:+4570704000" className="hover:underline">
                +45 7070 4000
              </a>
            </span>
          </div>
          <div>
            <Link
              to="/login"
              className="flex items-center space-x-1 hover:underline"
            >
              <FaUser />
              <span>Log ind</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center h-24">
          <div className="flex items-center space-x-2">
            <Link to={"/"}>
              {" "}
              <img className="h-70 w-70" src={Logo} alt="logo" />{" "}
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link to="/boliger" className="hover:text-[#1a2a3a]">
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
                <Link to="/kontakt" className="hover:text-[#1a2a3a]">
                  Kontakt os
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
