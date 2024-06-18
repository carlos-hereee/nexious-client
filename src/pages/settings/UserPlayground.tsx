import { useContext, useState } from "react";
import { IconButton } from "nexious-library";
import AppInProgress from "@pages/public/AppInProgress";
import { Banner } from "nexious-library/@nxs-organism";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import Notification from "@pages/dashboard/Notification";
import AccountSettings from "./AccountSettings";
import AppPlayground from "./AppPlayground";

const UserPlayground = () => {
  const [active, setActive] = useState<"apps" | "account" | "feed" | "notifications">("apps");
  const { user } = useContext(AuthContext);
  const { welcomeMessage, store } = useContext(AppContext);
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
          <IconButton
            icon={{ icon: "app", label: "Notifications" }}
            theme={active === "notifications" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("notifications")}
            ping={store.pendingOrders?.length}
          />
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </div>

        {active === "apps" && <AppPlayground />}
        {active === "feed" && <AppInProgress />}
        {active === "notifications" && <Notification />}
        {active === "account" && <AccountSettings />}
      </div>
    </div>
  );
};
export default UserPlayground;
