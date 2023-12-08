import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppListProps } from "app-context";
import AppCard from "./AppCard";
// import CreateAppButton from "./buttons/CreateAppButton";

const ExploreApps = () => {
  const { appList, updateActiveMenu } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSeeLive = (app: AppListProps) => {
    const name = app.appName.split(" ").join("+");
    const { logo, appName, menu, appId } = app;
    updateActiveMenu({ menu, appName, logo, media: app.media, appId });
    navigate(`/app/${name}`);
  };

  return (
    // <div className="">
    <div className="card-container">
      <h2 className="heading">New apps</h2>
      {appList.map((app) => {
        const appName = app.appName.split(" ").join("+");
        return (
          <AppCard
            app={app}
            key={app.appId}
            handleSeeLive={() => handleSeeLive(app)}
            handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
            owner={app.owner}
            theme={theme ? `app-card alt-${theme}` : "app-card"}
          />
        );
      })}
    </div>

    // </div>
  );
};
export default ExploreApps;
