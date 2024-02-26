import AppCard from "@components/app/AppCard";
import CreateApp from "@components/app/CreateApp";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { AppListProps } from "app-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { updateActiveAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSeeLive = (app: AppListProps) => {
    updateActiveAppData(app);
    navigate(`/${app.appUrl}`);
  };

  return (
    <div className="container">
      <CreateApp />
      <h2 className="heading">All your apps: </h2>
      <div className="card-container">
        {ownedApps.length > 0 ? (
          ownedApps.map((app) => {
            return (
              <AppCard
                app={app}
                key={app.appId}
                handleNavigation={(link: string) => navigate(`/${link}/${app.appUrl}`)}
                handleSeeLive={() => handleSeeLive(app)}
                theme="highlight"
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
