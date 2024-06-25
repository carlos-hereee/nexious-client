import { useContext, useEffect } from "react";
import { Loading } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) logout();
    else navigate("/");
  }, [accessToken]);

  return (
    <section className="primary-container">
      <Loading message="..loading user data" />
      <p className="text-max text-center">Loging out</p>
    </section>
  );
};
export default Logout;
