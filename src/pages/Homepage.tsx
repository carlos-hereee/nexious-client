import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";
import UserPlayground from "./UserPlayground";
import Login from "./Login";

const Homepage: React.FC = () => {
  const { accessToken } = useContext(AuthContext);
  if (accessToken) return <UserPlayground />;

  return (
    <>
      {/* <h2 className="heading">Nexious login</h2> */}
      <Login />
    </>
  );
};
export default Homepage;
