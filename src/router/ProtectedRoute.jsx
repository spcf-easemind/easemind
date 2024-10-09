import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../store/authentication";
import { useShallow } from "zustand/shallow";

export default function ProtectedRoute() {
  const { user } = useAuthenticationStore(
    useShallow((state) => ({ user: state.user }))
  );
  const location = useLocation();

  console.log(location);

  if (!user && location.pathname !== "/internet-identity") {
    return <Navigate to="/internet-identity" />;
  }

  if (user && location.pathname === "/internet-identity") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
