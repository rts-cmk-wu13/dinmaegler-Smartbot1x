import bg from "../assets/loginbg.png";
const HeroAccount = ({ title, breadcrumbs }) => {
  return (
    <div
      className="w-full h-[400px] bg-lightgray flex flex-col justify-center items-center text-white relative bg-cover bg-no-repeat bg-blend-multiply"
      style={{
        backgroundImage: `linear-gradient(rgba(51, 72, 92, 0.7), rgba(51, 72, 92, 0.7)), url(${bg})`,
        backgroundPosition: "50%",
      }}
    >
      <div className="text-center mt-10">
        <h2 className="font-semibold text-lg mb-4">{title}</h2>
        <div className="text-sm text-[#dbe6ee] flex justify-center items-center gap-2">
          {breadcrumbs.map((item, idx) => (
              item.text === "Home" ? (
                <a
                  key={idx}
                  href="/"
                  className={item.active ? "text-[#7a8fa4] underline" : "text-[#dbe6ee] underline"}
                >
                  {item.text}
                  {idx < breadcrumbs.length - 1 && (
                    <span className="mx-2 text-[#7a8fa4]">|</span>
                  )}
                </a>
              ) : (
                <span
                  key={idx}
                  className={item.active ? "text-[#7a8fa4]" : "text-[#dbe6ee]"}
                >
                  {item.text}
                  {idx < breadcrumbs.length - 1 && (
                    <span className="mx-2 text-[#7a8fa4]">|</span>
                  )}
                </span>
              )
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroAccount;
