// import { AuthContext } from "@context/auth/AuthContext";
// import { useContext, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  // const { resetAuthErrors } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   if (pathname) resetAuthErrors();
  // }, [pathname]);

  return <Outlet />;
};
export default PublicRoute;
