import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../store/authentication";

export default function ProtectedRoute() {
  const location = useLocation();
  const identity = useAuthenticationStore((state) => state.user);

  const { identityProvider, user } = {
    identityProvider: identity.identity_provider,
    user: identity.data,
  };

  // console.log(!identityProvider && !user && location.pathname !== "/login");

  if (!identityProvider && location.pathname !== "/internet-identity") {
    return <Navigate to="/internet-identity" />;
  } else if (identityProvider && location.pathname === "/internet-identity") {
    return <Navigate to="/login" />;
  } else if (identityProvider && !user && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  } else if (identityProvider && user && location.pathname === "/login") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
