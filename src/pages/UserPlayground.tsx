import { useContext, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { AppContext } from "@context/app/AppContext";
import { Button, Hero, Icon } from "nexious-library";
import { useNavigate } from "react-router-dom";
import WelcomeBanner from "@app/components/app/WelcomeBanner";
import { AppListProps } from "app-context";

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
            <div key={app.appId} className="card-row">
              <Hero hero={app.logo} theme="logo" onImageClick={() => handleNav(app, "edit-app")} />
              <div className="card-row-body">
                <h2 className="heading">{app?.appName || "No name"}</h2>
                {app.media && (
                  <div className="card-container">
                    {app.media.medias.map((d) => (
                      <a key={d.uid} className="nav-link" href={d.link || "#"}>
                        {d.media && <Icon icon={d.media} name={d.media} size="3x" />}
                      </a>
                    ))}
                  </div>
                )}
                {error && error[app.appId] && <p className="error-message">{error[app.appId]}</p>}
                <div className="navigation-container">
                  <Button label="Edit" onClick={() => handleNav(app, "edit-app")} />
                  <Button label="Settings" onClick={() => handleNav(app, "settings/app")} />
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
