import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";

const AppRoute = () => {
  const { isOnline, getAppWithName, appError } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const appName = query[query.length - 1];
    // console.log("appName :>> ", appName);
    if (appName) getAppWithName(appName);
    setIsLoading(false);
  }, [pathname]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (isLoading) return <Outlet />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
