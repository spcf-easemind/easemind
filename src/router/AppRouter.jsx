import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ProtectedRoute from "./ProtectedRoute.jsx";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import InternetIdentityPage from "../pages/InternetIdentityPage";
import SuperAdminPage from "../pages/SuperAdminPage.jsx";
import mainRoutes from "./modules/main-routes.jsx";
import navRoutes from "./modules/nav-routes.jsx";
import profileRoutes from "./modules/profile-routes.jsx";
import MiscellaneousPage from "../pages/MiscellaneousPage.jsx";

import { useAuthenticationStore } from "../store/authentication.js";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import LandingPage from "../pages/landing-page/LandingPage.jsx";

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
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/super-admin",
          element: <SuperAdminPage />,
        },
        {
          path: "/miscellaneous",
          element: <MiscellaneousPage />,
        },
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
            ...profileRoutes,
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
