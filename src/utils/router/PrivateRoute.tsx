import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
// import { AppContext } from "@app/context/app/AppContext";
// import { nexiousMenu, nexiousName } from "@data/nexious.json";

const PrivateRoute = () => {
  const { accessToken } = useContext(AuthContext);
  // const { updateActiveMenu } = useContext(AppContext);
  // updateActiveMenu(nexiousMenu, nexiousName);
  // if (isLoading) return <Outlet />;
  return accessToken ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute;
