import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { AppContext } from "@context/app/AppContext";
import {
  nexiousName,
  nexiousMedia,
  nexiousLogo,
  nexiousAuthMenu,
  nexiousAppId,
} from "@data/nexious.json";
import { toggleAuthMenuItem } from "@app/toggleMenu";

const PrivateRoute = () => {
  const { accessToken, subscriptions } = useContext(AuthContext);
  const { updateActiveAppData, activeMenu, activeAppName } = useContext(AppContext);
  const { pathname } = useLocation();

  // useEffect(() => {
  //   // user is login
  //   let oldValues = [...activeMenu];
  //   // find auth menu
  //   const authIdx = oldValues.findIndex((app) => app.isPrivate);
  //   // is user logged in
  //   if (accessToken) {
  //     // check if is origin app
  //     if (activeAppName !== nexiousName) {
  //       // check user subscriptions
  //       const subIdx = subscriptions.findIndex((sub) => sub.appName === activeAppName);
  //       // if user is subscribe to app toggle options
  //       if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
  //       else oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "subscribe");
  //       // otherwise user is at playground/dashboard
  //     } else oldValues = nexiousAuthMenu;
  //     // user logging out
  //   } else if (oldValues[authIdx].name === "logout") {
  //     oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "login");
  //   }
  // }, [accessToken, activeAppName]);
  useEffect(() => {
    if (pathname === "/dashboard") {
      updateActiveAppData({
        appId: nexiousAppId,
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: nexiousAuthMenu,
      });
    }
  }, [pathname]);

  return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
