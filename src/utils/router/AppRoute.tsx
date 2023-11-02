import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

const AppRoute = () => {
  const { isOffline } = useContext(AuthContext);
  if (isOffline) {
    return <Outlet />;
  } else return <Navigate to="/offline" />;
};
export default AppRoute;
