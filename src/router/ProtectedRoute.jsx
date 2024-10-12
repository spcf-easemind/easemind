import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthenticationStore } from "../store/authentication";
// import { useUsersStore } from "../store/users";

export default function ProtectedRoute() {
  const identity = useAuthenticationStore((state) => state.user);
  // const user = useUsersStore((state) => state.user);
  const location = useLocation();

  if (!identity && location.pathname !== "/internet-identity") {
    return <Navigate to="/internet-identity" />;
  } else if (identity && location.pathname === "/internet-identity") {
    return <Navigate to="/login" />;
  } 
  // else if (identity && !user && location.pathname !== "/login") {
  //   return <Navigate to="/login" />;
  // } else if (identity && user && location.pathname === "/login") {
  //   return <Navigate to="/home" />;
  // }

  return <Outlet />;
}
