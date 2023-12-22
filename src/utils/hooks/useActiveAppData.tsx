import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";

export const useActiveAppData = () => {
  const { activeAppName, getAppWithName, appId } = useContext(AppContext);
  // const { accessToken } = useContext(AuthContext);
  // const { updateActiveAppData } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    // if user logged in
    if (pathname.includes("app")) {
      const routeAppName = pathname.split("/")[2];
      if (!appId || routeAppName !== activeAppName) getAppWithName(routeAppName, true);
      if (routeAppName) getAppWithName(routeAppName, true);
      // update document details
    }
    // if(pathname.includes("explore")){

    // }
  }, [activeAppName, pathname]);
};
