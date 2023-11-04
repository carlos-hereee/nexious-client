import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import { AppContext } from "../context/app/AppContext";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  const { ownerId, isLoading } = useContext(AppContext);
  if (isLoading) return <Outlet />;
  return user.id === ownerId ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoute;
