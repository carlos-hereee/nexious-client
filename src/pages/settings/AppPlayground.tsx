import AppCard from "@components/app/AppCard";
import CreateApp from "@components/app/CreateApp";
import { AuthContext } from "@context/auth/AuthContext";
import { useAccountLimitations } from "@hooks/useAccountLimitations";
import { useContext } from "react";
import { Button, Dialog } from "nexious-library";
import ViewAccountTiers from "@components/app/ViewAccountTiers";
import { useToggle } from "@hooks/useToggle";
import { AppContext } from "@context/app/AppContext";

const AppPlayground = () => {
  const { ownedApps } = useContext(AuthContext);
  const { platformTiers } = useContext(AppContext);
  const { limitations } = useAccountLimitations();
  const { toggle, updateToggle } = useToggle();

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
        {ownedApps.length <= limitations.maxApps ? <CreateApp /> : <Button label="View plans" onClick={updateToggle} />}
      </div>
      {toggle && (
        <Dialog onDialogClose={updateToggle}>
          <ViewAccountTiers subscriptions={platformTiers} />
        </Dialog>
      )}
    </section>
  );
};
export default AppPlayground;
