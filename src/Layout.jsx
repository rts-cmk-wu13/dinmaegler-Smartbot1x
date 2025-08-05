import { Outlet } from "react-router";
/* import Darkmode from "./Components/darkmode"; */
import Header from "./Components/Header";
import Hero from "./Components/Hero";

function App() {
  return (
    <>
      <header>
        <Header />
        <Hero />
        {/*   <Darkmode /> */}
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>&copy; {new Date().getFullYear()} My App.</small>
      </footer>
    </>
  );
}

export default App;
