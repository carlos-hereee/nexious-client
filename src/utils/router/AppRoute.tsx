import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import {
  nexiousMedia,
  nexiousMenu,
  nexiousLogo,
  nexiousAuthMenu,
  nexiousAppMenu,
  nexiousName,
  nexiousAppId,
} from "@data/nexious.json";
import { combineArraysWithOutDups } from "nexious-library";
import { toggleMenuValues } from "@app/toggleMenu";
import { MenuProps } from "app-types";

const AppRoute = () => {
  const { isOnline, appError, appId } = useContext(AppContext);

  const { accessToken, subscriptions } = useContext(AuthContext);
  const {
    activeAppName,
    menu,
    store,
    logo,
    appName,
    media,
    pages,
    updateActiveAppData,
    getAppWithName,
    getAppStore,
    updateAppData,
    getStoreInventory,
  } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    // fetch app data
    const routeAppName = pathname.split("/")[2];
    if (pathname.includes("app")) {
      if (appName !== routeAppName) getAppWithName(routeAppName);
    }
    if (pathname.includes("store")) {
      if (routeAppName !== activeAppName) getAppStore(routeAppName);
      if (store.storeId) getStoreInventory(store.storeId);
    }
    if (pathname.includes("booking")) {
      // if (routeAppName !== activeAppName) getAppCalendar(routeAppName);
      // if (calendar.calendarId) getCalendarEvents(calendar.calendarId);
    }
  }, [pathname]);

  useEffect(() => {
    if (appName) {
      const pageName = pathname.split("/")[3];
      if (pageName) {
        const page = pages.filter((p) => p.name === pageName);
        if (page) updateAppData({ page: page[0] });
      }
      const noDups = combineArraysWithOutDups(nexiousAppMenu, menu);
      const oldValues = noDups as MenuProps[]; // find auth menu
      const authIdx = oldValues.findIndex((val) => val.category === "subscribe");
      if (authIdx >= 0) {
        // check user subscriptions
        const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
        // if user is subscribe to app toggle options
        oldValues[authIdx] = toggleMenuValues(oldValues[authIdx], subIdx >= 0 ? "unsubscribe" : "subscribe");
      }
      updateActiveAppData({ appName, logo, media, menu: oldValues, appId });
    } else {
      const menuValue = accessToken ? nexiousAuthMenu : nexiousMenu;
      updateActiveAppData({
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: menuValue,
        appId: nexiousAppId,
      });
    }
  }, [appName, subscriptions]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (appError) return <Navigate to="/" />;
  return <Outlet />;
};
export default AppRoute;
