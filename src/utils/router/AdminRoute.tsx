import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import { nexiousName, nexiousMedia, nexiousLogo, nexiousAuthMenu, nexiousAppId } from "@data/nexious.json";

const AdminRoute = () => {
  const { accessToken, isLoading: isAuthLoading } = useContext(AuthContext);
  const { isLoading: isAppLoading, getAppWithName, updateActiveAppData, appLink } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const routeAppName = query[query.length - 1];
    updateActiveAppData({
      appId: nexiousAppId,
      appName: nexiousName,
      logo: nexiousLogo,
      media: nexiousMedia,
      menu: nexiousAuthMenu,
    });
    if (routeAppName !== appLink) getAppWithName(routeAppName);
  }, [pathname]);

  if (isAppLoading) return <Outlet />;
  if (isAuthLoading) return <Outlet />;
  if (!accessToken) return <Navigate to="/" />;
  // TODO: check user is app owner
  // if (accessToken && user.userId !== owner.userId) return <Navigate to="/" />;
  return <Outlet />;
};
export default AdminRoute;
