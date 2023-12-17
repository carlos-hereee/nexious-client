import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { nexiousName } from "@data/nexious.json";
import { useActiveAppMenus } from "@hooks/useActiveAppMenus";

const AppRoute = () => {
  const { isOnline, getAppWithName, appError, activeAppName, activeAppId } = useContext(AppContext);
  const { pathname } = useLocation();

  useActiveAppMenus();
  useEffect(() => {
    const query = pathname.split("/");
    const routeAppName = query[2];
    if (routeAppName === activeAppName) document.title = activeAppName;
    if (routeAppName !== activeAppName) {
      document.title = nexiousName;
      getAppWithName(routeAppName, true);
    }
  }, [pathname, activeAppId]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
