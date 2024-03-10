import AppCard from "@components/app/AppCard";
import CreateApp from "@components/app/CreateApp";
import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);

  return (
    <div className="container">
      <CreateApp />
      <h2 className="heading">All your apps: </h2>
      <div className="card-container">
        {ownedApps.length > 0 ? (
          ownedApps.map((app) => {
            return <AppCard app={app} key={app.appId} theme="highlight" />;
          })
        ) : (
          <p>You dont own any apps</p>
        )}
      </div>
    </div>
  );
};
export default AppPlayground;
