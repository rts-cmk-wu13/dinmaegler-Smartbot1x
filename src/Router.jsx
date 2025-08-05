import { createBrowserRouter } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound";
import Loading from "./Components/Loading";
import Contact from "./Pages/Contact.jsx";
import { ErrorBoundary } from "./Components/Error";
import Boliger from "./Pages/Boliger.jsx";
import List from "./Pages/Mæglere.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <Loading />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "Boliger",
        element: <Boliger />,
      },
      {
        path: "Maeglere",
        element: <List />,
      },
      {
        path: "Kontakt Os",
        element: <Contact />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
