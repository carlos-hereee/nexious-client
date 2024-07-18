import { homeUrl } from "@config";
import { Notification as N } from "app-types";
import { Button, CopyButton, Navigation } from "nexious-library";

interface Props {
  notifications: N[];
  clearNotification: (key: string) => void;
}
const Notification = ({ notifications, clearNotification }: Props) => {
  return (
    <div className="container">
      <h1 className="heading">Notifications</h1>
      <div className="primary-container">
        <Navigation
          menus={["Created", "Type", "Action taken", "Message", "Link", "Remove"]}
          theme="navigation-bar hide-on-mobile"
        />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.notificationId} className="notification-row highlight">
              <p className="text-fit text-center">
                <strong>{new Date(notification.createdAt || Date.now()).toISOString().slice(0, 10)}</strong>
              </p>
              <p className="text-fit text-center">
                <strong>{notification.category}</strong>
              </p>
              <p className="text-fit text-center">
                <strong>{notification.name}</strong>
              </p>
              <p className="text-fit text-center">{notification.message}</p>
              {notification.link ? (
                <CopyButton data={homeUrl + notification.link} />
              ) : (
                <p className="text-fit text-center"> no-link</p>
              )}
              <Button
                label="X"
                theme="btn-cancel hide-on-mobile"
                onClick={() => clearNotification(notification.notificationId)}
              />
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
