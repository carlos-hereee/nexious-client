import { useState } from "react";
import { IconButton } from "nexious-library";
import WelcomeBanner from "@components/app/banners/WelcomeBanner";
import AppPlayground from "./AppPlayground";
import AccountSettings from "./AccountSettings";

const UserPlayground = () => {
  const [active, setActive] = useState<"apps" | "account">("apps");

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
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </div>

        {active === "apps" && <AppPlayground />}
        {active === "account" && <AccountSettings />}
      </div>
    </div>
  );
};
export default UserPlayground;
