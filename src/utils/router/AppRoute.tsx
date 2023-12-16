import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { toggleAuthMenuItem } from "@app/toggleMenu";
import { nexiousAppMenu } from "@data/nexious.json";

const AppRoute = () => {
  const { isOnline, getAppWithName, appError, activeAppName, updateActiveAppData, menu, appId } =
    useContext(AppContext);
  const { subscriptions, accessToken } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const query = pathname.split("/");
    const routeAppName = query[2];
    // console.log("routeAppName :>> ", routeAppName);
    if (routeAppName === activeAppName) document.title = activeAppName;
    if (routeAppName !== activeAppName) getAppWithName(routeAppName);
    // if (query[1] === "app" && routeAppName !== activeAppName) {
    //   getAppWithName(routeAppName);
    // }
    // if (query[1] === "store" && routeAppName !== activeAppName) {
    //   getAppWithName(routeAppName);
    // }
    // console.log("query :>> ", query);
  }, [pathname, activeAppName, appId]);
  // useEffect(() => {
  //   if (appName) document.title = appName;
  // }, [appName]);
  useEffect(() => {
    // if user logged in
    if (accessToken) {
      const oldValues = nexiousAppMenu;
      oldValues.concat(menu);
      // find auth menu
      const authIdx = oldValues.findIndex((app) => app.category === "subscribe");
      // check user subscriptions
      const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
      // if user is subscribe to app toggle options
      if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
      updateActiveAppData({ menu: oldValues });
    }
  }, [accessToken, activeAppName, JSON.stringify(subscriptions)]);

  if (!isOnline) return <Navigate to="/offline" />;
  if (!appError) return <Outlet />;
  return <Navigate to="/" />;
};
export default AppRoute;
