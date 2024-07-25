import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import { nexiousName, nexiousMedia, nexiousLogo, nexiousAuthMenu, nexiousAppId } from "@data/nexious.json";
import { MediaContext } from "@context/media/MediaContext";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { getPosts } = useContext(MediaContext);
  const { pathname } = useLocation();

  useEffect(() => {
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
