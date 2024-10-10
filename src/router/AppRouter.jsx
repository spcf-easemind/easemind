import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ProtectedRoute from "./ProtectedRoute.jsx";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import InternetIdentityPage from "../pages/InternetIdentityPage";
import mainRoutes from "./modules/main-routes.jsx";

import { useAuthenticationStore } from "../store/authentication.js";
import { useEffect } from "react";

export default function AppRouter() {
  const initialize = useAuthenticationStore((state) => state.initializeJuno);

  useEffect(() => {
    initialize();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "/internet-identity",
              element: <InternetIdentityPage />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
            ...mainRoutes,
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
