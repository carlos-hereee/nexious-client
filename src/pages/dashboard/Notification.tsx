// import { homeUrl } from "@config";
import { Notification as N } from "app-types";
import { Button, Navigation } from "nexious-library";

interface Props {
  notifications: N[];
  clearNotification: (key: string) => void;
}
const Notification = ({ notifications, clearNotification }: Props) => {
  return (
    <div className="container">
      <h2 className="heading">Notifications</h2>
      <Navigation menus={["Created", "Type", "Message", " "]} theme="navigation-bar hide-on-mobile" />
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.notificationId} className="notification-row highlight">
            <p className="text-fit hide-on-mobile">
              <strong>{new Date(notification.createdAt || Date.now()).toISOString().slice(0, 10)}</strong>
            </p>
            <p className="text-fit hide-on-mobile">
              <strong>{notification.category}</strong>
            </p>
            {/* <p className="text-fit">
              <strong>{notification.name}</strong>
            </p> */}
            {/* <ReadMore data={notification.message} uid="message" /> */}
            <p className="text-fit">{notification.message}</p>
            {/* {notification.link ? (
                <CopyButton data={homeUrl + notification.link} />
              ) : (
                <p className="text-fit text-center hide-on-mobile"> no-link</p>
              )} */}
            <Button label="X" theme="btn-cancel hide-on-mobile" onClick={() => clearNotification(notification.notificationId)} />
          </div>
        ))
      ) : (
        <p>All caught up</p>
      )}
    </div>
  );
};
export default Notification;
