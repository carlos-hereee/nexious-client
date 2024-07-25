import { useContext, useEffect, useState } from "react";
import { IconButton, Banner } from "nexious-library";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import Notification from "@pages/dashboard/Notification";
import { useNotifications } from "@hooks/useNotifications";
import OwnerDashboard from "@pages/dashboard/OwnerDashboard";
import TrackOrder from "@components/app/containers/TrackOrders";
import { StoreContext } from "@context/store/StoreContext";
import { MediaContext } from "@context/media/MediaContext";
import ViewPosts from "@components/app/ViewPosts";
import AccountSettings from "./AccountSettings";
import AppPlayground from "../settings/AppPlayground";

type Menu = "apps" | "account" | "feed" | "notifications" | "orders" | "admin";

const UserPlayground = () => {
  const [active, setActive] = useState<Menu>("apps");
  const { user, notifications, clearNotification, isPlatformOwner, tierUpdate, setUpdateTier, updateTier } =
    useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  const { trackOrder } = useContext(StoreContext);
  const { posts } = useContext(MediaContext);

  const { ping } = useNotifications();

  useEffect(() => {
    // handle account update for new users
    if (tierUpdate) {
      updateTier({ user, plan: tierUpdate });
      setUpdateTier(undefined);
    }
  }, [tierUpdate]);
  useEffect(() => {
    if (trackOrder) setActive("orders");
  }, []);

  return (
    <section className="container">
      <Banner message={`${welcomeMessage} ${user.nickname ? user.nickname : user.username}`} />
      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}
      <div className="container">
        <nav className="navigation-container">
          {isPlatformOwner && (
            <IconButton
              icon={{ icon: "account", label: "Admin" }}
              theme={active === "admin" ? "btn-main btn-active" : "btn-main"}
              onClick={() => setActive("admin")}
            />
          )}
          <IconButton
            icon={{ icon: "app", label: "Apps" }}
            theme={active === "apps" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("apps")}
          />
          {/* TODO: ADD FEED FOR APPS USER IS SUBSCRIBE TO  */}
          <IconButton
            icon={{ icon: "scroll", label: "Feed" }}
            theme={active === "feed" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("feed")}
          />
          <IconButton
            icon={{ icon: "bell", label: "Notifications" }}
            theme={active === "notifications" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("notifications")}
            ping={ping.notifications || undefined}
          />
          <IconButton
            icon={{ icon: "shopping", label: "Orders" }}
            theme={active === "orders" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("orders")}
          />
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </nav>

        {active === "admin" && <OwnerDashboard />}
        {active === "apps" && <AppPlayground />}
        {active === "feed" && <ViewPosts posts={posts} />}
        {active === "orders" && <TrackOrder />}
        {active === "notifications" && <Notification notifications={notifications} clearNotification={clearNotification} />}
        {active === "account" && <AccountSettings />}
      </div>
    </section>
  );
};
export default UserPlayground;
