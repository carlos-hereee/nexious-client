import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";

const AppRoute = () => {
  const { isOnline, getAppWithName, appError } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const query = location.pathname.split("/");
    const appName = query[query.length - 1];
    // console.log("appName :>> ", appName);
    getAppWithName(appName);
    setIsLoading(false);
  }, []);

  // if (appName) updateActiveMenu(menu, appName);
  if (!isOnline) return <Navigate to="/offline" />;
  if (isLoading) return <Outlet />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
