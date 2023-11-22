import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";
import UserPlayground from "./UserPlayground";
import Landing from "./Landing";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  if (accessToken) return <UserPlayground />;
  return (
    <div>
      <Landing />
    </div>
  );
};
export default Homepage;
