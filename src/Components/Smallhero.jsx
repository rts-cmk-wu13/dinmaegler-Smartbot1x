import herofoto from "../assets/pageheader.svg";
export default function Heading({ className = "", h1, ...rest }) {
  return (
    <div
      className={`w-full relative grid place-items-center ${className}`}
      {...rest}
    >
      <h1 className="heading absolute  z-9  text-6xl text-white  ">{h1}</h1>

      <div
        className="w-full h-[192px] object-cover "
        style={{
          backgroundImage: `linear-gradient(rgba(211, 211, 211, .5), rgba(211, 211, 211, .5)), url(${herofoto})`,
          backgroundPosition: "50%",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      />
    </div>
  );
}
