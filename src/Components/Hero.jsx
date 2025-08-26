import Heropic from "../assets/hero.png";
import { DrawCircleText } from "./Motion/text";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(27, 28, 47, .8), rgba(27, 28, 47, .1)), url(${Heropic})`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      <div className="relative z-[2] w-full max-w-[920px] h-[202px] mx-auto text-center text-white">
        <h1 className="text-5xl font-extrabold mb-10 drop-shadow-lg">
          <DrawCircleText />
        </h1>
        <div className="bg-white text-[#222] rounded-lg shadow-2xl p-8 text-left max-w-[920pxx-auto">
          <div className="font-semibold mb-2">
            <span className="border-b'">Søg</span> blandt 158 boliger til salg i
            74 butikker
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
