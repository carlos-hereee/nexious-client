import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
// import { useActiveAppMenus } from "@hooks/useActiveAppMenus";
import { useActiveAppData } from "@hooks/useActiveAppData";

const AppRoute = () => {
  const { isOnline, appError } = useContext(AppContext);

  // useActiveAppMenus();
  useActiveAppData();

  if (!isOnline) return <Navigate to="/offline" />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
