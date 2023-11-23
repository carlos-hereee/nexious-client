import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const { owner, isLoading } = useContext(AppContext);
  console.log("user :>> ", user);
  console.log("owner :>> ", owner);
  if (isLoading) return <Outlet />;
  return user.userId === owner.userId ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoute;
