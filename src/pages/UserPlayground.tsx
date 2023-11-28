import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
// import { Button, Hero, Icon } from "nexious-library";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@app/components/app/WelcomeBanner";
import { AppListProps } from "app-context";
import AppCard from "@app/components/app/AppCard";

const UserPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { updateActiveMenu } = useContext(AppContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSeeLive = (app: AppListProps) => {
    const name = app.appName.split(" ").join("+");
    updateActiveMenu({
      menu: app.menu || [],
      appName: name.split("+").join(" "),
      logo: app.logo,
      media: app.media,
    });
    navigate(`/app/${name}`);
  };

  const handleNav = (app: AppListProps, link: string) => {
    const name = app.appName.split(" ").join("+");
    navigate(`/${link}/${name}`);
  };
  const handleBuild = () => navigate("/build-app");

  console.log("ownedApps :>> ", ownedApps);
  return (
    <div className="container">
      <WelcomeBanner />
      <div className="container">
        <h2 className="heading">All your apps: </h2>
        <button type="button" className="btn-main w-max" onClick={handleBuild}>
          + Create a new app
        </button>
        {ownedApps.length > 0 ? (
          ownedApps.map((app) => (
            <AppCard
              app={app}
              key={app.appId}
              errorMessage={error[app.appId]}
              handleNavigation={(link: string) => handleNav(app, link)}
              handleSeeLive={() => handleSeeLive(app)}
              owner={app.owner}
              theme="card-row"
            />
          ))
        ) : (
          <p>You dont own any apps</p>
        )}
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
