import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { dashboardMenu } from "@data/data.json";
import { Notification } from "app-types";
import { useContext, useEffect, useState } from "react";

interface NotificationCount {
  apps: number;
  app: number;
  account: number;
  feed: number;
  notifications: number;
  orders: number;
}
export const useNotifications = () => {
  const { notifications: userNotifications } = useContext(AuthContext);
  const { notifications: appNotifications } = useContext(AppContext);
  const [ping, setPing] = useState<NotificationCount>(dashboardMenu);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const notificationCount: NotificationCount = { apps: 0, app: 0, account: 0, feed: 0, notifications: 0, orders: 0 };
    let notificationData: Notification[] = [];

    if (userNotifications && userNotifications.length > 0) {
      userNotifications.forEach((notification) => {
        if (notification.category === "orders") notificationCount.orders += 1;
        notificationCount.notifications += 1;
      });
      notificationData = [...notificationData, ...userNotifications];
    }
    if (appNotifications && appNotifications.length > 0) {
      appNotifications.forEach((notification) => {
        if (notification.category === "app") notificationCount.app += 1;
        notificationCount.notifications += 1;
      });
      notificationData = [...notificationData, ...userNotifications];
    }
    setPing(notificationCount);
    setNotifications(notificationData);
  }, [userNotifications, appNotifications]);
  return { ping, setPing, notifications };
};
