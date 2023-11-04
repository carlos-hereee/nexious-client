import { useContext, useState } from "react";
import { AuthContext } from "../utils/context/auth/AuthContext";
import { AppContext } from "../utils/context/app/AppContext";
import { Button, Hero } from "nexious-library";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@app/components/app/WelcomeBanner";

const UserPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { theme, getAppWithName } = useContext(AppContext);
  const [error, setError] = useState<{ [key: string]: any }>({});

  const navigate = useNavigate();

  const handleSeeLive = (app: { appName?: string; appId: string }) => {
    if (!app.appName) {
      setError({
        ...error,
        [app.appId]: "Could not see live app because app name has not been set",
      });
    } else {
      let name = app.appName.split(" ").join("+");
      getAppWithName(name);
      navigate({ pathname: "/app", search: `?appName=${name}` });
    }
  };
  const handleEdit = (app: { appName?: string; appId: string }) => {
    if (!app.appName) {
      setError({
        ...error,
        [app.appId]: "Could not see live app because app name has not been set",
      });
    } else {
      let name = app.appName.split(" ").join("+");
      getAppWithName(name);
      navigate({ pathname: "/edit-app/", search: `?appName=${name}` });
    }
  };
  const handleAdvancedSetting = (app: { appName: string; appId: string }) => {
    // console.log("app", app);
    if (!app.appName) {
      setError({
        ...error,
        [app.appId]: "Could not see live app because app name has not been set",
      });
    } else {
      let name = app.appName.split(" ").join("+");
      getAppWithName(name);
      navigate({ pathname: "/settings/app/", search: `?appName=${name}` });
    }
  };
  // console.log("ownedApps", ownedApps);
  return (
    <div className="container">
      <WelcomeBanner />
      <div className="container">
        <h2 className="heading">All your apps: </h2>
        <button
          type="button"
          className={`btn-main w-max ${theme ? "btn-" + theme : ""}`}
          onClick={() => navigate("/build-app")}
        >
          + Create a new app
        </button>
        {ownedApps && ownedApps.length > 0 ? (
          ownedApps.map((app) => (
            <div key={app.appId} className="card-row pad-t">
              <Hero hero={app.logo || {}} onImageClick={() => handleEdit(app)} />
              <div className="flex-column elbow-space mb-2">
                <h2 className="heading">{app?.appName || "No name"}</h2>
                <div>
                  {error && error[app.appId] && (
                    <p className="error-message">{error[app.appId]}</p>
                  )}
                </div>
                <div className="flex-row flex-wrap">
                  <Button label="Edit app" onClick={() => handleEdit(app)} />
                  <Button
                    label="Advanced settings"
                    onClick={() => handleAdvancedSetting(app)}
                  />
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
