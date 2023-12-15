// import { useContext, useState } from "react";
import { useState } from "react";
// import { AppContext } from "@context/app/AppContext";
import { IconButton } from "nexious-library";
// import { Button, Hero, Icon } from "nexious-library";
// import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@components/app/banners/WelcomeBanner";
import ExploreApps from "@components/app/ExploreApps";
// import { AdminContext } from "@context/admin/AdminContext";
// import { AppContext } from "@context/app/AppContext";
import AppPlayground from "./AppPlayground";
import AccountSettings from "./settings/AccountSettings";
// import { AppListProps} from "app-types";
// import AppCard from "@components/app/AppCard";

const UserPlayground = () => {
  // const { ownedApps } = useContext(AuthContext);
  // const { listBucket } = useContext(AdminContext);
  // const { appId } = useContext(AppContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [error, setError] = useState<{ [key: string]: string }>({});
  // const navigate = useNavigate();

  const [active, setActive] = useState<"apps" | "explore" | "account">("explore");

  // console.log('object :>> ', object);
  // console.log("appList :>> ", appList);
  return (
    <div className="container">
      <WelcomeBanner />
      {/* <button type="button" onClick={() => listBucket(appId)}>
        List bucket
      </button> */}
      <div className="container">
        <div className="navigation-container">
          <IconButton
            icon={{ icon: "app", label: "Apps" }}
            theme={active === "apps" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("apps")}
          />
          <IconButton
            icon={{ icon: "explore", label: "Explore" }}
            theme={active === "explore" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("explore")}
          />
          <IconButton
            icon={{ icon: "account", label: "Account" }}
            theme={active === "account" ? "btn-main btn-active" : "btn-main"}
            onClick={() => setActive("account")}
          />
        </div>

        {active === "apps" && <AppPlayground />}
        {active === "account" && <AccountSettings />}
        {active === "explore" && <ExploreApps />}
      </div>
    </div>
  );
};
export default UserPlayground;
