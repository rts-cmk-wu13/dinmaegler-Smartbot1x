import { createBrowserRouter } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound";
import Loading from "./Components/Loading";
import Contact from "./Pages/Contact.jsx";
import { ErrorBoundary } from "./Components/Error";
import Boliger from "./Pages/Boliger.jsx";
import Details from "./Pages/Details.jsx";
import List from "./Pages/Mæglere.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/register.jsx";
import Favs from "./Pages/favoritter.jsx";
import ContactAgent from "./Pages/contact-agent.jsx";

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
        path: "Boliger/:id",
        element: <Details />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Maegler",
        element: <List />,
      },
      {
        path: "Favoritter",
        element: <Favs />,
      },
      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "contact-agent/:id",
        element: <ContactAgent />,
      },
      /*  {
        path: "contact-maegler",
        element: <ContactAgent />,
      }, */
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
