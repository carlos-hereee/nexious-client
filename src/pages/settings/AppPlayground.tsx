import AppCard from "@components/app/AppCard";
import CreateApp from "@components/app/CreateApp";
import { AuthContext } from "@context/auth/AuthContext";
import { useContext } from "react";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);

  return (
    <section className="container">
      <h2 className="heading">All your apps: </h2>
      <div className="app-playground">
        <div className="appcard-container">
          {ownedApps.length > 0 ? (
            ownedApps.map((app) => {
              return <AppCard app={app} key={app.appId} theme="highlight" />;
            })
          ) : (
            <p>You dont own any apps</p>
          )}
        </div>
        <CreateApp />
      </div>
    </section>
  );
};
export default AppPlayground;
