// import { useContext, useEffect } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";

const AdminRoute = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { owner, appError, isLoading } = useContext(AppContext);
  // const location = useLocation();

  // useEffect(() => {
  //   if (!isLoading) {
  //     const query = location.pathname.split("/");
  //     const queryName = query[query.length - 1];
  //     if (appName !== queryName) getAppWithName(queryName);
  //   }
  // }, [isLoading]);

  if (isLoading) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  if (!appError) return <Outlet />;
  if (user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
