import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { useActiveAppMenus } from "@hooks/useActiveAppMenus";

const AppRoute = () => {
  const { isOnline, appError } = useContext(AppContext);

  useActiveAppMenus();

  if (!isOnline) return <Navigate to="/offline" />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
