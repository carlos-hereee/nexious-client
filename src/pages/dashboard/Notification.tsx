import { AuthContext } from "@context/auth/AuthContext";
import { useNotifications } from "@hooks/useNotifications";
import { Button } from "nexious-library";
import { useContext } from "react";

const Notification = () => {
  const { notifications } = useNotifications();
  const { clearNotification } = useContext(AuthContext);

  console.log("notifications :>> ", notifications);
  return (
    <div className="container">
      <h1 className="heading">Notifications</h1>

      <div className="primary-container">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.notificationId} className="notification-row">
              <p className="text-fit">
                <strong>{notification.category}</strong>
              </p>
              <p className="text-fit">
                <strong>{notification.name}</strong>
              </p>
              <p className="text-fit">{notification.message}</p>
              <p className="text-fit">{notification.link}</p>
              <Button label="X" theme="btn-cancel" onClick={() => clearNotification(notification.notificationId)} />
            </div>
          ))
        ) : (
          <p>All caught up</p>
        )}
      </div>
    </div>
  );
};
export default Notification;
