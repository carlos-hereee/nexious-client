import { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { AppContext } from "@context/app/AppContext";
import { nexiousMenu, nexiousName, nexiousMedia, nexiousLogo } from "@data/nexious.json";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/dashboard") {
      updateActiveAppData({
        appId: "",
        appName: nexiousName,
        logo: nexiousLogo,
        media: nexiousMedia,
        menu: nexiousMenu,
      });
    }
  }, [pathname]);

  return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
