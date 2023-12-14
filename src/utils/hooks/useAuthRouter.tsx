import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthRouter = () => {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) navigate("/dashboard");
  }, [accessToken]);

  const navigateTo = (route: string) => navigate(`/${route}`);
  return { navigateTo };
};
