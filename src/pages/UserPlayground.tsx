// import { useContext, useState } from "react";
import { useState } from "react";
// import { AppContext } from "@context/app/AppContext";
import { IconButton } from "nexious-library";
// import { Button, Hero, Icon } from "nexious-library";
// import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@app/components/app/WelcomeBanner";
import AppSettings from "./settings/AppSettings";
// import { AppListProps } from "app-context";
// import AppCard from "@app/components/app/AppCard";

const UserPlayground = () => {
  // const { ownedApps } = useContext(AuthContext);
  // const { updateActiveMenu } = useContext(AppContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [error, setError] = useState<{ [key: string]: string }>({});
  // const navigate = useNavigate();

  const [active, setActive] = useState<"apps" | "explore" | "account">("apps");

  // console.log("ownedApps :>> ", ownedApps);
  return (
    <div className="container">
      <WelcomeBanner />
      <div className="container">
        <div className="navigation-container">
          <IconButton icon={{ icon: "app", label: "Apps" }} theme="btn-main" />
          <IconButton icon={{ icon: "explore", label: "Explore" }} theme="btn-main" />
          <IconButton icon={{ icon: "account", label: "Account" }} theme="btn-main" />
        </div>

        {active === "apps" && <AppSettings />}

        {/* <div className="flex-g">
          <Button label={label.app} onClick={() => handleMenu("app")} theme={appTheme} />
          <Button label={label.account} onClick={() => handleMenu("account")} theme={accTheme} />
        </div>
        {active === "account" && show[active] && <AccountSettings onClick={handleMenu} />}
        {active === "app" && show[active] && <AppSettings onClick={handleMenu} />}
    
        {active === "editApp" && show[active] && <EditApp onClick={handleMenu} />} */}
      </div>
      {/* <div>FOOTER</div> */}
    </div>
  );
};
export default UserPlayground;
