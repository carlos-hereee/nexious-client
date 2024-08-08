import AppCard from "@components/card/AppCard";
import CreateApp from "@components/card/CreateApp";
import { AuthContext } from "@context/auth/AuthContext";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import { useContext } from "react";
import AppLimitations from "@components/app/AppLimitations";

const AppPlayground = () => {
  const { ownedApps, isPlatformOwner } = useContext(AuthContext);
  const { limitations } = useAccountLimitations();

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
        <AppLimitations
          heading={
            isPlatformOwner || ownedApps.length < limitations.maxApps
              ? "Create more apps"
              : "Upgrade your account to create more apps"
          }
        >
          {isPlatformOwner ? <CreateApp /> : ownedApps.length < limitations.maxApps && <CreateApp />}
        </AppLimitations>
      </div>
    </section>
  );
};
export default AppPlayground;
