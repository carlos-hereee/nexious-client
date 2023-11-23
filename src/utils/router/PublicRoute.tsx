import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";

const PublicRoute = () => {
  const { accessToken } = useContext(AuthContext);

  if (accessToken) return <Navigate to="/dashboard" />;
  return <Outlet />;
};
export default PublicRoute;
