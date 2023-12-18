import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/auth/AuthContext";
import { AppListProps } from "app-types";
import AppCard from "./AppCard";
// import CreateAppButton from "./buttons/CreateAppButton";

const ExploreApps = (props: { featuredOnly?: boolean; heading?: string }) => {
  const { featuredOnly, heading } = props;
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
    if (featuredList.length === 0) return <div />;
    return (
      <div className="container">
        {heading && <h2 className="heading">{heading}</h2>}
        {featuredList.map((app) => {
          const appName = app.appName.split(" ").join("+");
          return (
            <AppCard
              app={app}
              key={app.appId}
              handleSeeLive={() => handleSeeLive(app)}
              handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
              owner={app.owner}
              theme={theme ? ` alt-${theme}` : ""}
            />
          );
        })}
      </div>
    );
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
            theme={theme ? ` alt-${theme}` : ""}
          />
        );
      })}
    </div>
  );
};
export default ExploreApps;
