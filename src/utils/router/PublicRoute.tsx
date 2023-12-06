import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
// import { AppContext } from "@context/app/AppContext";

const PublicRoute = () => {
  const { accessToken } = useContext(AuthContext);
  // const { updateActiveMenu } = useContext(AppContext);

  // updateActiveMenu(nexiousMenu, nexiousName);

  if (accessToken) return <Navigate to="/dashboard" />;
  return <Outlet />;
};
export default PublicRoute;
