import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import { Button, Hero } from "nexious-library";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@app/components/app/WelcomeBanner";
import messages from "@data/messages.json";
import { AppListProps } from "app-context";
// import { nexiousMenu, nexiousName } from "@data/nexious.json";

const UserPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { getAppWithName, updateActiveMenu } = useContext(AppContext);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  // console.log("ownedApps :>> ", ownedApps);

  const handleSeeLive = (app: AppListProps) => {
    if (!app.appName) {
      setError({ ...error, [app.appId]: messages.appNameRequired });
    } else {
      const name = app.appName.split(" ").join("+");
      updateActiveMenu({
        menu: app.menu || [],
        appName: name.split("+").join(" "),
        logo: app.logo,
      });
      getAppWithName(name);
      navigate({ pathname: "/app", search: `?appName=${name}` });
    }
  };
  const handleEdit = (app: AppListProps) => {
    if (!app.appName) {
      setError({ ...error, [app.appId]: messages.appNameRequired });
    } else {
      const name = app.appName.split(" ").join("+");
      getAppWithName(name);
      navigate({ pathname: "/edit-app/", search: `?appName=${name}` });
    }
  };
  const handleAdvancedSetting = (app: AppListProps) => {
    if (!app.appName) {
      setError({ ...error, [app.appId]: messages.appNameRequired });
    } else {
      const name = app.appName.split(" ").join("+");
      getAppWithName(name);
      navigate({ pathname: "/settings/app/", search: `?appName=${name}` });
    }
  };
  const handleBuild = () => navigate("/build-app");
  // console.log("ownedApps", ownedApps);
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
            <div key={app.appId} className="card-row">
              <Hero hero={app.logo || {}} theme="logo" onImageClick={() => handleEdit(app)} />
              <div className="card-row-body">
                <h2 className="heading">{app?.appName || "No name"}</h2>
                {error && error[app.appId] && <p className="error-message">{error[app.appId]}</p>}
                <div className="navigation-container">
                  <Button label="Edit" onClick={() => handleEdit(app)} />
                  <Button label="Settings" onClick={() => handleAdvancedSetting(app)} />
                  <Button label="See live" onClick={() => handleSeeLive(app)} />
                </div>
              </div>
            </div>
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
