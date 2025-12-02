import "../Styles/Notfound.css";
import { Link } from "react-router";
import background from "../assets/background.svg";

export default function NotFound() {
  return (
    <section className="not-found flex flex-col items-center justify-center">
      <h1 className="text">Hov!</h1>
      <img
        className="backgroundfoto"
        src={background}
        alt="Not Found Background"
      />

      <h2 className="subtitle">Du er havnet på en side som ikke findes!</h2>
      <p className="description">
        Det er vi kede af! Vi har sendt en besked af sted til vores
        internetbureau, og bedt dem se på fejlen.
      </p>

      <Link to="/">
        {" "}
        <button className="back-btn">Tilbage til forsiden</button>
      </Link>
    </section>
  );
}
