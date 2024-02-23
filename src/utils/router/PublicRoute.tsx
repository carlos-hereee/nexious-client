import { useActiveAppData } from "@hooks/useActiveAppData";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  useActiveAppData();

  return <Outlet />;
};
export default PublicRoute;
