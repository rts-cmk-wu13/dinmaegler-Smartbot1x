import { IoIosSend, IoIosCall } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
/* import NavBar from "./NavBar"; */
import Navs from "./customnav";
export default function Header() {
  return (
    <>
      <div className="bg-[#1a2a3a] text-white text-sm">
        <div className="container mx-auto flex justify-between items-center /* py-2 px-4 */ h-16">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <IoIosSend />
              <a
                href="mailto:4000@dinmaegler.com"
                className="hover:underline cursor-pointer"
              >
                4000@dinmaegler.com
              </a>
            </span>
            <span className="flex items-center space-x-1">
              <IoIosCall />
              <a
                href="tel:+4570704000"
                className="hover:underline cursor-pointer"
              >
                +45 7070 4000
              </a>
            </span>
          </div>
          <div>
            <Link
              to="/login"
              className="flex items-center space-x-1 hover:underline cursor-pointer"
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
              <img
                className="h-24 w-70 text-white cursor-pointer"
                src="/icons/Frame.svg"
                alt="logo"
              />{" "}
            </Link>
          </div>
          <Navs />
        </div>
      </div>
    </>
  );
}
