// import { AuthContext } from "@context/auth/AuthContext";
// import { useContext, useEffect } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PublicRoute = () => {
  // const { accessToken } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (accessToken) navigate("/dashboard");
  // }, [accessToken]);

  return <Outlet />;
};
export default PublicRoute;
