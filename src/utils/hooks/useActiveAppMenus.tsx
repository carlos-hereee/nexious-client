// import { AuthContext } from "@context/auth/AuthContext";
// import { useContext, useEffect } from "react";
// import {
//   nexiousName,
//   nexiousMedia,
//   nexiousMenu,
//   nexiousLogo,
//   nexiousAuthMenu,
//   nexiousAppId,
//   nexiousAppMenu,
// } from "@data/nexious.json";
// import { AppContext } from "@context/app/AppContext";
// import { toggleAuthMenuItem } from "@app/toggleMenu";
// import { useLocation } from "react-router-dom";
// import { combineArraysWithOutDups } from "nexious-library";
// import { MenuProps } from "app-types";

// export const useActiveAppMenus = () => {
//   const { accessToken, subscriptions } = useContext(AuthContext);
//   const { activeMenu, activeAppName, updateActiveAppData, getAppWithName, getAppStore } =
//     useContext(AppContext);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // if user logged in
//     // check route homepage
//     if (pathname === "/" || pathname.includes("checkout") || pathname.includes("explore")) {
//       updateActiveAppData({
//         appId: nexiousAppId,
//         appName: nexiousName,
//         logo: nexiousLogo,
//         media: nexiousMedia,
//         menu: accessToken ? nexiousAuthMenu : nexiousMenu,
//       });
//     } else if (pathname.includes("app")) {
//       const routeAppName = pathname.split("/")[2];
//       getAppWithName(routeAppName, true);
//     } else if (pathname.includes("store")) {
//       const routeAppName = pathname.split("/")[2];
//       console.log("routeAppName :>> ", routeAppName);
//       getAppStore(routeAppName);
//     } else {
//       const routeAppName = pathname.split("/")[2];
//       if (routeAppName === activeAppName) {
//         // check route matches active app name
//         const noDups = combineArraysWithOutDups(nexiousAppMenu, activeMenu);
//         const oldValues = noDups as MenuProps[];
//         // find auth menu
//         const authIdx = oldValues.findIndex((app) => app.category === "subscribe");
//         if (authIdx >= 0) {
//           // check user subscriptions
//           const subIdx = subscriptions.findIndex((subs) => subs.appName === activeAppName);
//           // if user is subscribe to app toggle options
//           if (subIdx >= 0)
//             oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
//           updateActiveAppData({ menu: oldValues });
//         }
//       }
//     }
//     // update document details
//   }, [pathname]);
// };
