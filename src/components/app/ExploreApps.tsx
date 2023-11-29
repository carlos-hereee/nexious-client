import { AppContext } from "@app/context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppCard from "./AppCard";

const ExploreApps = () => {
  const { appList } = useContext(AppContext);
  const navigate = useNavigate();

  console.log("appList :>> ", appList);
  return (
    <div>
      {appList.map((app) => {
        const appName = app.appName.split(" ").join("+");
        return (
          <AppCard
            app={app}
            key={app.appId}
            handleSeeLive={() => navigate(`/app/${appName}`)}
            handleNavigation={(link: string) => navigate(`/${link}/${appName}`)}
            owner={app.owner}
          />
        );
      })}
    </div>
  );
};
export default ExploreApps;
