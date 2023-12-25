import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";

const AdminRoute = () => {
  const { accessToken, isLoading: isAuthLoading } = useContext(AuthContext);
  const { isLoading: isAppLoading, getAppWithName, appName } = useContext(AppContext);
  // const { user, accessToken, isLoading: isAuthLoading } = useContext(AuthContext);
  // const { owner, isLoading: isAppLoading, getAppWithName, appName } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const routeAppName = query[query.length - 1];
    if (!appName) {
      if (routeAppName) getAppWithName(routeAppName);
    } else if (routeAppName !== appName) getAppWithName(routeAppName);
  }, [pathname, appName]);

  if (isAppLoading) return <Outlet />;
  if (isAuthLoading) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  // TODO: check user is app owner
  // if (accessToken && user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
