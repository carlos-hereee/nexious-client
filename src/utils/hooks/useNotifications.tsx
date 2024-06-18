import { AuthContext } from "@context/auth/AuthContext";
import { dashboardMenu } from "@data/data.json";
// import { Notification } from "app-types";
import { useContext, useEffect, useState } from "react";

interface NotificationCount {
  apps: number;
  account: number;
  feed: number;
  notifications: number;
  orders: number;
}
export const useNotifications = () => {
  const { notifications } = useContext(AuthContext);
  const [ping, setPing] = useState<NotificationCount>(dashboardMenu);

  useEffect(() => {
    if (notifications) {
      const notificationCount: NotificationCount = {
        apps: 0,
        account: 0,
        feed: 0,
        notifications: 0,
        orders: 0,
      };
      notifications.forEach((notification) => {
        if (notification.type === "orders") notificationCount.orders += 1;
      });
    }
  }, [notifications]);
  return { ping, setPing };
};
