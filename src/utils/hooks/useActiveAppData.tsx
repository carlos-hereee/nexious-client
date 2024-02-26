import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect } from "react";
import {
  nexiousName,
  nexiousMedia,
  nexiousMenu,
  nexiousLogo,
  nexiousAuthMenu,
  nexiousAppId,
  nexiousAppMenu,
} from "@data/nexious.json";
import { AppContext } from "@context/app/AppContext";
// import { toggleAuthMenuItem } from "@app/toggleMenu";
import { useLocation } from "react-router-dom";
// import { combineArraysWithOutDups } from "nexious-library";
// import { MenuProps } from "app-types";
import { combineArraysWithOutDups } from "nexious-library";
import { toggleAuthMenuItem } from "@app/toggleMenu";
import { MenuProps } from "app-types";

export const useActiveAppData = () => {
  const { accessToken, subscriptions } = useContext(AuthContext);
  const { activeAppName, updateActiveAppData, getAppWithName, getAppStore, menu, store, getStoreInventory } =
    useContext(AppContext);
  const { pathname } = useLocation();

  const homeRoutes = ["/", "/checkout", "/explore", "/build-app"];
  useEffect(() => {
    if (homeRoutes.includes(pathname)) {
      // check route homepage
      updateActiveAppData({
        appId: nexiousAppId,
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: accessToken ? nexiousAuthMenu : nexiousMenu,
      });
    } else if (pathname.includes("app")) {
      const routeAppName = pathname.split("/")[2];
      // console.log("routeAppName, pathname :>> ", routeAppName === activeAppName, pathname);
      //   // check route matches active app name
      if (routeAppName !== activeAppName) getAppWithName(routeAppName);
      else {
        const noDups = combineArraysWithOutDups(nexiousAppMenu, menu);
        const oldValues = noDups as MenuProps[]; // find auth menu
        const authIdx = oldValues.findIndex((val) => val.category === "subscribe");
        if (authIdx >= 0) {
          // check user subscriptions
          const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
          // if user is subscribe to app toggle options
          if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
          // updateActiveAppData({ menu: oldValues });
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
    // update document details
  }, [pathname]);
};
