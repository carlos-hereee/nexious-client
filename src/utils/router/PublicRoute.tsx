import { Outlet } from "react-router-dom";
// import { Outlet, useLocation } from "react-router-dom";
import { useActiveAppMenus } from "@hooks/useActiveAppMenus";

const PublicRoute = () => {
  // const { pathname } = useLocation();
  useActiveAppMenus();

  // if(pathname ==="/ ") return

  return <Outlet />;
};
export default PublicRoute;
