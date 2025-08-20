import bg from "../assets/loginbg.png";

const HeroAccount = ({ title, breadcrumbs }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundImage: `url(${bg})`,
        backgroundColor: "lightgray",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2 style={{ fontWeight: 600, fontSize: "18px", marginBottom: "16px" }}>
          {title}
        </h2>
        <div style={{ fontSize: "13px", color: "#dbe6ee" }}>
          {breadcrumbs.map((item, idx) => (
            <span
              key={idx}
              style={{ color: item.active ? "#7a8fa4" : "#dbe6ee" }}
            >
              {item.text}
              {idx < breadcrumbs.length - 1 && (
                <span style={{ margin: "0 8px", color: "#7a8fa4" }}>|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroAccount;
