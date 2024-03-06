import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { useActiveAppData } from "@hooks/useActiveAppData";

const AppRoute = () => {
  const { isOnline, appError } = useContext(AppContext);

  useActiveAppData();

  if (!isOnline) return <Navigate to="/offline" />;
  if (appError) return <Navigate to="/" />;
  return <Outlet />;
};
export default AppRoute;
