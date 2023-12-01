import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { nexiousMenu, nexiousName } from "@data/nexious.json";

const AdminRoute = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { owner, getAppWithName, appError, isLoading } = useContext(AppContext);
  const location = useLocation();
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const query = location.pathname.split("/");
      const appName = query[query.length - 1];
      // console.log("appName :>> ", appName);
      getAppWithName(appName);
    }
    // setIsLoading(false);
  }, [isLoading]);

  // useEffect(() => {
  //   if (appLoading) {
  //     console.log("appLoading :>> ", appLoading);
  //     setIsLoading(true);
  //   }
  // }, [appLoading]);

  if (isLoading) return <Outlet />;
  if (!appError) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  if (user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
