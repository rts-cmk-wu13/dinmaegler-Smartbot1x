import Heropic from "../../assets/hero.png";
import { DrawCircleText } from "../Motion/text";

export default function Hero() {
  return (
    <section
      className="relative w-full max-w-full h-[850px] flex items-center justify-center bg-cover bg-bottom bg-blend-soft-light"
      style={{
        backgroundImage: `linear-gradient(rgba(51, 72, 92, 0.7), rgba(51, 72, 92, 0.7)), url(${Heropic})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div className="absolute inset-0" />
      <div className="relative z-[2] w-full max-w-[920px] h-[202px] mx-auto text-center text-white">
        <h1 className="text-5xl font-extrabold mb-10 drop-shadow-lg">
          <DrawCircleText />
        </h1>
        <div className="bg-white text-[#222] rounded-lg shadow-2xl p-8 text-left max-w-[920px] h-[202px]">
          <div className="font-semibold mb-2">
            <span className="border-b-4 border-[#162A41] ">Søg</span> blandt 158
            boliger til salg i 74 butikker
          </div>
          <div className="mb-4 text-gray-600">
            Hvad skal din næste bolig indeholde
          </div>
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Søg fx. glaskeramisk komfur, bryggers, kælder eller lignende"
              className="flex-1 p-3 border border-gray-300 rounded text-base"
            />
            <button
              type="submit"
              className="p-2.5 px-12 bg-[#162A41] text-white rounded font-bold hover:bg-[#162A50] cursor-pointer transition-colors"
            >
              Søg
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
