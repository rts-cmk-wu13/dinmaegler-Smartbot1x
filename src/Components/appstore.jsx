import { FaApple } from "react-icons/fa";
import phonefoto from "../assets/1stfone.png";
import secondfoto from "../assets/sndfone.svg";
export default function AppStore() {
  return (
    <>
      <div className="flex gap-4  items-center justify-center bg-[#162A41] p-8 rounded-lg shadow-lg text-white ">
        <div className="flex gap-4 flex-col items-center justify-center  p-8  text-white ">
          <h2>Hold dig opdateret på salgsprocessen</h2>
          <p>
            Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den{" "}
            <br />
            ansvarlige mægler eller butik med vores app. Her kan du også se
            statistik på <br />
            ressen for din bolig i alle vores salgskanaler.
          </p>
          <div className="flex gap-4 mt-4">
            <button className=" cursor-pointer flex items-center gap-2 text-black bg-white px-4 py-2 rounded hover:bg-gray-600 transition">
              <img src="/icons/playstore.png" alt="google store" />
              Google Play
            </button>
            <button className="cursor-pointer flex items-center gap-2 text-white bg-transparent border-white border-[1px] px-4 py-2 rounded hover:bg-gradient-to-tr hover:from-[#2a2a2a] hover:via-[#292a29] hover:to-[#292929] transition">
              <FaApple className="text-3xl" />
              App Store
            </button>
          </div>
        </div>
        <div className=" flex ">
          <img src={phonefoto} alt="app store fone" />
          <img src={secondfoto} alt="app store fone" />
        </div>
      </div>
    </>
  );
}
