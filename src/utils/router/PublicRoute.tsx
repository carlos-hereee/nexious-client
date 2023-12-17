import { Outlet } from "react-router-dom";
import { useActiveAppMenus } from "@hooks/useActiveAppMenus";

const PublicRoute = () => {
  useActiveAppMenus();

  return <Outlet />;
};
export default PublicRoute;
