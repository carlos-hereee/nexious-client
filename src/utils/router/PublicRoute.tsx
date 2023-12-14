import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { Outlet, useLocation } from "react-router-dom";
import {
  nexiousName,
  nexiousMedia,
  nexiousLogo,
  nexiousMenu,
  nexiousAuthMenu,
  nexiousAppId,
} from "@data/nexious.json";
import { AuthContext } from "@context/auth/AuthContext";

const PublicRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      updateActiveAppData({
        appId: nexiousAppId,
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: accessToken ? nexiousAuthMenu : nexiousMenu,
      });
    }
  }, [pathname, accessToken]);

  return <Outlet />;
};
export default PublicRoute;
