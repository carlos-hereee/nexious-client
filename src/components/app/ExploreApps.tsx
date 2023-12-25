import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppCard from "./AppCard";

const ExploreApps = (props: { featuredOnly?: boolean; heading?: string }) => {
  const { featuredOnly, heading } = props;
  const { appList, getAppList } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: AVOID DOUBLE RENDDER
    getAppList();
    // console.log("appList :>> ", appList);
  }, []);

  if (featuredOnly) {
    const featuredList = appList.slice(0, 5);
    if (featuredList.length === 0) return <div />;
    return (
      <div className="card-container">
        {heading && <h2 className="heading">{heading}</h2>}
        {featuredList.map((app) => {
          const appName = app.appName.split(" ").join("+");
          return (
            <AppCard
              app={app}
              key={app.appId}
              handleSeeLive={() => navigate(`/app/${appName}`)}
              handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
              owner={app.owner}
              theme="highlight"
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
            handleSeeLive={() => navigate(`/app/${appName}`)}
            handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
            owner={app.owner}
            theme="highlight"
          />
        );
      })}
    </div>
  );
};
export default ExploreApps;
