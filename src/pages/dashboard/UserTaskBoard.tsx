import { UserContext } from "@context/user/UserContext";
import { useContext } from "react";

const UserTaskBoard = () => {
  const { boards } = useContext(UserContext);
  console.log("boards :>> ", boards);
  return <div className="primary-container">UserTaskBoard</div>;
};
export default UserTaskBoard;
