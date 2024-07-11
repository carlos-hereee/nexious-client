import AppCard from "@components/app/AppCard";
import CreateApp from "@components/app/CreateApp";
import { AuthContext } from "@context/auth/AuthContext";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import { useContext } from "react";
import { Button } from "nexious-library";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { limitations } = useAccountLimitations();
  console.log("limitations :>> ", limitations);
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
        {ownedApps.length > limitations.maxApps ? <CreateApp /> : <Button label="Subscribe to a plan" />}
      </div>
    </section>
  );
};
export default AppPlayground;
