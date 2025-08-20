import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Loading from "./Components/Loading";
/* import Darkmode from "./Components/darkmode"; */
import Header from "./Components/Header";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with real logic as needed)
    const timer = setTimeout(() => setIsLoading(false), 500);
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
        <small>&copy; {new Date().getFullYear()} My App.</small>
      </footer>
    </>
  );
}

export default App;
