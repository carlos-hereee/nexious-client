import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";

const PublicRoute = () => {
  const { isOffline } = useContext(AuthContext);
  // if on a public route and server comes online redirect to homepage
  if (!isOffline) return <Outlet />;
};
export default PublicRoute;
