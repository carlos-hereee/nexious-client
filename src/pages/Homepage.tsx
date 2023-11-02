import { AuthContext } from "@app/utils/context/auth/AuthContext";
import { useContext } from "react";
import UserPlayground from "./UserPlayground";
import Login from "./Login";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  if (accessToken) return <UserPlayground />;
  return <Login />;
};
export default Homepage;
