import { useContext, useEffect, useState } from "react";
import { IconButton } from "nexious-library";
import AppInProgress from "@pages/public/AppInProgress";
import { Banner } from "nexious-library/@nxs-organism";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import Notification from "@pages/dashboard/Notification";
import { useNotifications } from "@hooks/useNotifications";
import ViewOrdersContainer from "@components/app/containers/ViewOrdersContainer";
import OwnerDashboard from "@pages/dashboard/OwnerDashboard";
import AccountSettings from "./AccountSettings";
import AppPlayground from "../settings/AppPlayground";

type Menu = "apps" | "account" | "feed" | "notifications" | "orders" | "admin";

const UserPlayground = () => {
  const [active, setActive] = useState<Menu>("apps");
  const { user, notifications, clearNotification, isPlatformOwner, tierUpdate, setUpdateTier, updateTier } =
    useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  const { ping } = useNotifications();

  useEffect(() => {
    // handle account update for new users
    if (tierUpdate) {
      updateTier({ user, plan: tierUpdate });
      setUpdateTier(undefined);
    }
  }, [tierUpdate]);

  return (
    <div className="container">
      <Banner message={`${welcomeMessage} ${user.nickname ? user.nickname : user.username}`} />;
      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}
      <div className="container">
        <div className="navigation-container">
          {isPlatformOwner && (
            <IconButton
              icon={{ icon: "account", label: "Admin" }}
              theme={active === "admin" ? "btn-main btn-active" : "btn-main"}
              onClick={() => setActive("admin")}
            />
          )}
          <IconButton
            icon={{ icon: "app", label: "My apps" }}
            theme={active === "apps" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("apps")}
          />
          {/* TODO: ADD FEED FOR APPS USER IS SUBSCRIBE TO  */}
          <IconButton
            icon={{ icon: "app", label: "Feed" }}
            theme={active === "feed" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("feed")}
          />
          <IconButton
            icon={{ icon: "app", label: "Notifications" }}
            theme={active === "notifications" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("notifications")}
            ping={ping.notifications || undefined}
          />
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </div>

        {active === "admin" && <OwnerDashboard />}
        {active === "apps" && <AppPlayground />}
        {active === "feed" && <AppInProgress />}
        {active === "orders" && <ViewOrdersContainer heading="Orders" />}
        {active === "notifications" && <Notification notifications={notifications} clearNotification={clearNotification} />}
        {active === "account" && <AccountSettings />}
      </div>
    </div>
  );
};
export default UserPlayground;
