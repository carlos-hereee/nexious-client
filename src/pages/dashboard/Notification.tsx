import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";

const Notification = () => {
  const { notifications } = useContext(AuthContext);
  const { notifications: appNotifications } = useContext(AuthContext);
  console.log("notifications :>> ", notifications);
  console.log("appNotifications :>> ", appNotifications);
  return (
    <div>
      <h1 className="heading">Notifications</h1>
    </div>
  );
};
export default Notification;
