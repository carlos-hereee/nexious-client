import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  // if (isLoading) return <Outlet />;

  return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
