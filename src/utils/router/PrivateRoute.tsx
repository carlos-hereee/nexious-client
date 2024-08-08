import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import { nexiousName, nexiousMedia, nexiousLogo, nexiousAuthMenu, nexiousAppId } from "@data/nexious.json";
import { MediaContext } from "@context/media/MediaContext";
import { LogContext } from "@context/log/LogContext";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { getPosts } = useContext(MediaContext);
  const { setPage } = useContext(LogContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setPage("private");
    if (pathname === "/dashboard") {
      getPosts("");
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
