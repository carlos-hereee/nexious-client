import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@app/context/app/AppContext";

const AppRoute = () => {
  const {
    isOnline,
    // appName, updateActiveMenu, menu
  } = useContext(AppContext);

  // if (appName) updateActiveMenu(menu, appName);
  if (isOnline) return <Outlet />;
  return <Navigate to="/offline" />;
};
export default AppRoute;
