import { AppContext } from "@app/context/app/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@app/context/auth/AuthContext";
import AppCard from "./AppCard";

const ExploreApps = () => {
  const { appList } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex-gap">
      {appList.map((app) => {
        const appName = app.appName.split(" ").join("+");
        return (
          <AppCard
            app={app}
            key={app.appId}
            handleSeeLive={() => navigate(`/app/${appName}`)}
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
