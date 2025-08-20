import { createBrowserRouter } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound";
import Loading from "./Components/Loading";
import Contact from "./Pages/Contact.jsx";
import { ErrorBoundary } from "./Components/Error";
import Boliger from "./Pages/Boliger.jsx";
import List from "./Pages/Mæglere.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/register.jsx";
import { useState, useEffect } from "react";
import Favs from "./Pages/favoritter.jsx";

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
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Maeglere",
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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
