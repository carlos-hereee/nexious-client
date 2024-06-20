import { AuthContext } from "@context/auth/AuthContext";
import { useNotifications } from "@hooks/useNotifications";
import { Button, Navigation } from "nexious-library";
import { useContext } from "react";

const Notification = () => {
  const { notifications } = useNotifications();
  const { clearNotification } = useContext(AuthContext);

  return (
    <div className="container">
      <h1 className="heading">Notifications</h1>
      <div className="primary-container">
        <Navigation menus={["Type", "Action taken", "Message", "Link", "Remove"]} theme="navigation-bar" />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.notificationId} className="notification-row highlight">
              <p className="text-fit text-center">
                <strong>{notification.category}</strong>
              </p>
              <p className="text-fit text-center">
                <strong>{notification.name}</strong>
              </p>
              <p className="text-fit text-center">{notification.message}</p>
              <p className="text-fit text-center">{notification.link}</p>
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
