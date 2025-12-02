import { Link } from "react-router";
import logo from "/Frame.svg";
import { IoCall } from "react-icons/io5";
import { FaPaperPlane } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="max-w-[1200px] mx-auto flex justify-between flex-wrap mt-[85px]">
        <div className="flex-1 min-w-[350px] mr-10">
          <div className="flex items-center mb-4">
            <img src={logo} alt="Logo" className="h-8 mr-2" />
          </div>
          <p className="text-[#333] ">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have <br /> suffered alteration in some form, by
            injected humour, or randomised words.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 max-w-[350px]">
            <div className="flex items-center mb-4.5">
              <div className="bg-[#2D3A4B] rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <IoCall className="text-white" />
              </div>
              <div>
                <div className="text-sm text-[#6c757d]">Ring til os</div>
                <div className="font-bold text-[#2D3A4B]">+45 7070 4000</div>
              </div>
            </div>
            <div className="flex items-center mb-4.5">
              <div className="bg-[#2D3A4B] rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <FaPaperPlane className="text-white" />
              </div>
              <div>
                <div className="text-sm text-[#6c757d]">Send en mail</div>
                <div className="font-bold text-[#2D3A4B]">
                  4000@dinmaegler.com
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4.5">
              <div className="bg-[#2D3A4B] rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <FaLocationDot className="text-white" />
              </div>
              <div>
                <div className="text-sm text-[#6c757d]">Butik</div>
                <div className="font-bold text-[#2D3A4B]">
                  Stændertorvet 78, 4000 Roskilde
                </div>
              </div>
            </div>
            <div className="text-base text-[#6c757d] mt-3">
              Din Mægler Roskilde, er din boligbutik i lokalområdet.
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[200px] ml-10">
          <div className="font-bold text-[#2D3A4B] mb-4">Quick Links</div>
          <ul className="list-none p-0 m-0">
            <li className="mb-2.5">
              <Link to={"/boliger"} className="text-[#2D3A4B] no-underline">
                Boliger til salg
              </Link>
            </li>
            <li className="mb-2.5">
              <Link to={"/maeglere"} className="text-[#2D3A4B] no-underline">
                Mæglere
              </Link>
            </li>
            <li className="mb-2.5">
              <Link to={"/Contact"} className="text-[#2D3A4B] no-underline">
                Kontakt os
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="text-[#2D3A4B] no-underline">
                Log ind / bliv bruger
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 min-w-[200px] ml-10 ">
          <div className="text-xs text-[#6c757d] mb-1.5">Medlem af</div>
          <div className="font-bold text-xl text-[#2D3A4B]">DMS</div>
          <div className="text-sm text-[#6c757d]">
            Dansk Mægler Sammenslutning
          </div>
        </div>
      </div>
      <div className="bg-[#223047] text-white text-center py-4 mt-10 text-base">
        Layout By Jt Banik 2020
      </div>
    </>
  );
};

export default Footer;
