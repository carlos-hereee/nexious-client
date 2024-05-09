import { useState } from "react";
import { IconButton } from "nexious-library";
import WelcomeBanner from "@components/app/banners/WelcomeBanner";
import AppInProgress from "@pages/public/AppInProgress";
import AppPlayground from "./AppPlayground";
import AccountSettings from "./AccountSettings";

const UserPlayground = () => {
  const [active, setActive] = useState<"apps" | "account" | "feed" | "notifications">("apps");

  return (
    <div className="container">
      <WelcomeBanner />
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
          />
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </div>

        {active === "apps" && <AppPlayground />}
        {active === "feed" && <AppInProgress />}
        {active === "notifications" && <AppInProgress />}
        {active === "account" && <AccountSettings />}
      </div>
    </div>
  );
};
export default UserPlayground;
