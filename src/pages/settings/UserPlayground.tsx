import { useContext, useState } from "react";
import { IconButton } from "nexious-library";
import AppInProgress from "@pages/public/AppInProgress";
import { Banner } from "nexious-library/@nxs-organism";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import Notification from "@pages/dashboard/Notification";
import { useNotifications } from "@hooks/useNotifications";
import ViewOrdersContainer from "@components/app/containers/ViewOrdersContainer";
import AccountSettings from "./AccountSettings";
import AppPlayground from "./AppPlayground";

type Menu = "apps" | "account" | "feed" | "notifications" | "orders";

const UserPlayground = () => {
  const [active, setActive] = useState<Menu>("apps");
  const { user, notifications } = useContext(AuthContext);
  const { welcomeMessage } = useContext(AppContext);
  const { ping } = useNotifications();

  return (
    <div className="container">
      <Banner message={`${welcomeMessage} ${user.nickname ? user.nickname : user.username}`} />;
      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}
      <div className="container">
        <div className="navigation-container">
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
          {/* TODO: USER NOTIFICATIONS I.E. INCOMING/PENDING ORDERS  */}
          {/* <IconButton
            icon={{ icon: "checkout", label: "orders" }}
            theme={active === "orders" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("orders")}
            ping={ping.orders || undefined}
          /> */}
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

        {active === "apps" && <AppPlayground />}
        {active === "feed" && <AppInProgress />}
        {active === "orders" && <ViewOrdersContainer heading="Orders" />}
        {active === "notifications" && <Notification notifications={notifications} />}
        {active === "account" && <AccountSettings />}
      </div>
    </div>
  );
};
export default UserPlayground;
