import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { nexiousMenu, nexiousName } from "@data/nexious.json";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const {
    owner,
    isLoading,
    // updateActiveMenu
  } = useContext(AppContext);

  // updateActiveMenu(nexiousMenu, nexiousName);

  if (isLoading) return <Outlet />;
  return user.userId === owner.userId ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoute;
