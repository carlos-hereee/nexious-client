import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";

const AdminRoute = () => {
  const { user, accessToken, isLoading: isAuthLoading } = useContext(AuthContext);
  const { owner, isLoading: isAppLoading, getAppWithName, appName } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const routeName = query[query.length - 1];
    if (!appName) {
      if (routeName) getAppWithName(routeName);
    } else if (routeName !== appName) getAppWithName(routeName);
  }, [pathname, appName]);
  console.log("authLoading :>> ", isAuthLoading, "app loading state =>", isAppLoading);
  console.log("accessToken :>> ", accessToken);
  console.log("user :>> ", user);
  console.log("owner :>> ", owner);
  if (isAppLoading) return <Outlet />;
  if (isAuthLoading) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  // if (accessToken && user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
