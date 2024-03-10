import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { nexiousMedia, nexiousMenu, nexiousLogo, nexiousAuthMenu, nexiousAppMenu } from "@data/nexious.json";
import { combineArraysWithOutDups } from "nexious-library";
import { toggleAuthMenuItem } from "@app/toggleMenu";
import { MenuProps } from "app-types";

const AppRoute = () => {
  const { isOnline, appError } = useContext(AppContext);

  const { accessToken, subscriptions } = useContext(AuthContext);
  const { activeAppName, updateActiveAppData, getAppWithName, getAppStore, menu, store, getStoreInventory, appName } =
    useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("app")) {
      const routeAppName = pathname.split("/")[2];
      const pageName = pathname.split("/")[3];
      if (pageName) {
        console.log("routeName :>> ", routeAppName, pageName);
        console.log("menu:>> ", menu);
        // const idx = menu.findIndex((m) => m.value === pageName);
        // getPageWithId(menu[idx].menuId);
      }
      // check route matches active app name
      else if (routeAppName !== appName) {
        updateActiveAppData({
          appName: routeAppName,
          logo: nexiousLogo,
          media: nexiousMedia,
          menu: accessToken ? nexiousAuthMenu : nexiousMenu,
        });
        getAppWithName(routeAppName);
      } else {
        const noDups = combineArraysWithOutDups(nexiousAppMenu, menu);
        const oldValues = noDups as MenuProps[]; // find auth menu
        const authIdx = oldValues.findIndex((val) => val.category === "subscribe");
        if (authIdx >= 0) {
          // check user subscriptions
          const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
          // if user is subscribe to app toggle options
          if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
          updateActiveAppData({ menu: oldValues });
        }
        // console.log("activeAppName, routeAppName :>> ", activeAppName, routeAppName);
      }
    } else if (pathname.includes("store")) {
      const routeAppName = pathname.split("/")[2];
      // console.log("routeAppName :>> ", routeAppName);
      if (routeAppName !== activeAppName) getAppStore(routeAppName);
      if (store.storeId) getStoreInventory(store.storeId);
      // console.log("store :>> ", store);
      // console.log("routeAppName :>> ", routeAppName);
    }
  }, [pathname]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (appError) return <Navigate to="/" />;
  return <Outlet />;
};
export default AppRoute;
