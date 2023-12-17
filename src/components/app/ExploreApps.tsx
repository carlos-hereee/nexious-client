import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppListProps } from "app-types";
import AppCard from "./AppCard";
// import CreateAppButton from "./buttons/CreateAppButton";

const ExploreApps = (props: { featuredOnly?: boolean }) => {
  const { featuredOnly } = props;
  const { appList, updateActiveAppData } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSeeLive = (app: AppListProps) => {
    const name = app.appName.split(" ").join("+");
    const { logo, appName, menu, appId } = app;
    updateActiveAppData({ menu, appName, logo, media: app.media, appId });
    navigate(`/app/${name}`);
  };

  if (featuredOnly) {
    const featuredList = appList.slice(0, 5);
    return featuredList.map((app) => {
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
    });
  }
  return (
    <div className="card-container">
      <h2 className="heading">Featured Apps</h2>
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
  );
};
export default ExploreApps;
