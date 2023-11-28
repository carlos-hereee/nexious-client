import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { nexiousMenu, nexiousName } from "@data/nexious.json";

const AdminRoute = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { owner, getAppWithName, appError } = useContext(AppContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = location.pathname.split("/");
    const appName = query[query.length - 1];
    console.log("appName :>> ", appName);
    getAppWithName(appName);
    setIsLoading(false);
  }, []);
  console.log("appError :>> ", appError);
  if (isLoading) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  if (appError) return <Navigate to="/" />;
  if (user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
