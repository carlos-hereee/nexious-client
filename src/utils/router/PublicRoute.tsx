// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "@context/auth/AuthContext";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  // const { accessToken } = useContext(AuthContext);

  // if (accessToken) return <Navigate to="/dashboard" />;
  return <Outlet />;
};
export default PublicRoute;
