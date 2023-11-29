import AppCard from "@app/components/app/AppCard";
import { AppContext } from "@app/context/app/AppContext";
import { AuthContext } from "@app/context/auth/AuthContext";
import { AppListProps } from "app-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AppSettings = () => {
  const { ownedApps } = useContext(AuthContext);
  const { updateActiveMenu } = useContext(AppContext);
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

  return (
    <div>
      <h2 className="heading">All your apps: </h2>
      <button type="button" className="btn-main w-max" onClick={handleBuild}>
        + Create a new app
      </button>
      {ownedApps.length > 0 ? (
        ownedApps.map((app) => (
          <AppCard
            app={app}
            key={app.appId}
            handleNavigation={(link: string) => handleNav(app, link)}
            handleSeeLive={() => handleSeeLive(app)}
            owner={app.owner}
            theme="card-row"
          />
        ))
      ) : (
        <p>You dont own any apps</p>
      )}
    </div>
  );
};
export default AppSettings;
