import AppCard from "@app/components/app/AppCard";
import CreateApp from "@app/components/app/CreateApp";
import { AppContext } from "@app/context/app/AppContext";
import { AuthContext } from "@app/context/auth/AuthContext";
import { AppListProps } from "app-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { updateActiveMenu } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSeeLive = (app: AppListProps) => {
    const name = app.appName.split(" ").join("+");
    const { logo, appName, menu } = app;
    updateActiveMenu({ menu, appName, logo, media: app.media });
    navigate(`/app/${name}`);
  };

  return (
    <div className="container">
      <CreateApp />
      <div className="container">
        <h2 className="heading">All your apps: </h2>
        {ownedApps.length > 0 ? (
          ownedApps.map((app) => {
            const appName = app.appName.split(" ").join("+");
            return (
              <AppCard
                app={app}
                key={app.appId}
                handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
                handleSeeLive={() => handleSeeLive(app)}
                owner={app.owner}
                theme="card-row"
              />
            );
          })
        ) : (
          <p>You dont own any apps</p>
        )}
      </div>
    </div>
  );
};
export default AppPlayground;
