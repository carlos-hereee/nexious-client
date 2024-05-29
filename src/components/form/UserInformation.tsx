import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";

const UserInformation = () => {
  const { user, updateUser } = useContext(AuthContext);

  console.log("user :>> ", user);
  return (
    <div className="container">
      <h3 className="heading">User information</h3>
    </div>
  );
};
export default UserInformation;
