import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ProtectedRoute from "./ProtectedRoute.jsx";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import InternetIdentityPage from "../pages/InternetIdentityPage";
import mainRoutes from "./modules/main-routes.jsx";
import navRoutes from "./modules/nav-routes.jsx";

import { useAuthenticationStore } from "../store/authentication.js";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AppRouter() {
  const { initialize, user, logout } = useAuthenticationStore(
    useShallow((state) => ({
      initialize: state.initializeJuno,
      user: state.user,
      logout: state.logoutInternetIdentity,
    }))
  );

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!user) {
      logout();
    }
  }, [user, logout]);

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
            ...navRoutes,
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
