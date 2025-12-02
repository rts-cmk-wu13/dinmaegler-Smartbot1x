import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Loading from "./Components/Loading";
/* import Darkmode from "./Components/darkmode"; */
import Header from "./Components/Header";
import Footer from "./Components/footer";

function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 260);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <Header />
        {/*    <Darkmode /> */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
