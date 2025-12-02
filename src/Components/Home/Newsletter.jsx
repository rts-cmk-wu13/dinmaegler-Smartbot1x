import { FaLongArrowAltRight } from "react-icons/fa";

export default function Newsletter() {
  return (
    <section className="newsletter-section flex items-center justify-center bg-gray-100 py-10">
      <p>
        Tilmeld dig vores nyhedsbrev og <br /> hold dig opdateret på
        boligmarkedet
      </p>
      <div className="relative w-full max-w-md mt-4 ">
        <div className="newsletter-input-wrapper">
          <input
            type="email"
            id="newsletter-email"
            placeholder="Indtast din email"
            className="w-[540px] h-[74px] rounder-[4px] bg-[#FFF] focus:outline-none focus:ring-2 focus:ring-[#162A41] placeholder:items-center"
          />
          <span className="arrow-icon">
            <FaLongArrowAltRight />
          </span>
        </div>
      </div>
    </section>
  );
}
