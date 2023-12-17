import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { toggleAuthMenuItem } from "@app/toggleMenu";
import { nexiousAppMenu, nexiousName } from "@data/nexious.json";

const AppRoute = () => {
  const {
    isOnline,
    getAppWithName,
    appError,
    activeAppName,
    updateActiveAppData,
    activeAppId,
    activeMenu,
  } = useContext(AppContext);
  const { subscriptions, accessToken } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const routeAppName = query[2];
    if (routeAppName === activeAppName) document.title = activeAppName;
    if (routeAppName !== activeAppName) {
      document.title = nexiousName;
      getAppWithName(routeAppName, true);
    }
  }, [pathname, activeAppId]);

  useEffect(() => {
    // if user logged in
    if (accessToken) {
      const oldValues = nexiousAppMenu.concat(activeMenu);
      // find auth menu
      const authIdx = oldValues.findIndex((app) => app.category === "subscribe");
      // check user subscriptions
      const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
      // if user is subscribe to app toggle options
      if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
      // avoid redundant data reset menus
      // updateActiveAppData({ menu: [] });
      updateActiveAppData({ menu: oldValues });
    }
  }, [accessToken, activeAppName, JSON.stringify(subscriptions)]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
