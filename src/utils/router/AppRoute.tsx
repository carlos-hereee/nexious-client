import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { nexiousMedia, nexiousMenu, nexiousLogo, nexiousAuthMenu, nexiousName, nexiousAppId } from "@data/nexious.json";
// import { toggleMenuValues } from "@app/toggleMenu";
// import { MenuProp } from "app-types";

const AppRoute = () => {
  const { isOnline, appError, appId } = useContext(AppContext);
  const { accessToken } = useContext(AuthContext);
  const { menu, logo, appName, media, updateActiveAppData, getAppWithName } = useContext(AppContext);
  // getAppStore,
  // store,
  // getStoreInventory,
  const { pathname } = useLocation();

  useEffect(() => {
    // fetch app data
    const routeAppName = pathname.split("/")[2];
    if (appName !== routeAppName) getAppWithName(routeAppName);
  }, [pathname]);

  useEffect(() => {
    if (appName) updateActiveAppData({ appName, logo, media, menu, appId });
    else {
      updateActiveAppData({
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: accessToken ? nexiousAuthMenu : nexiousMenu,
        appId: nexiousAppId,
      });
    }
  }, [appName]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (appError) return <Navigate to="/" />;
  return <Outlet />;
};
export default AppRoute;
