import { SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, Button, CopyButton } from "nexious-library";
import { useAccountLimitations } from "@hooks/useAccountLimitations";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale } = useContext(AppContext);
  const { limitations } = useAccountLimitations();

  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  return (
    <div className="container">
      <h2 className="heading">App:</h2>
      <ItemDetail label="Copy app url: " labelLayout="bolden">
        <CopyButton data={appUrl} />
      </ItemDetail>
      <ItemDetail label="App language:" labelLayout="bolden">
        {locale || "Coming Soon!"}
      </ItemDetail>
      <ItemDetail label="Max app pages:" labelLayout="bolden">
        <span>{limitations.maxPagesPerApp || 0}</span>
      </ItemDetail>
      <ItemDetail label="Calendar events:" labelLayout="bolden">
        <span>{limitations.calendarEvents ? "Active" : "Disabled"}</span>
      </ItemDetail>
      <ItemDetail label="Online store:" labelLayout="bolden">
        <span>{limitations.onlineStore ? "Active" : "Disabled"}</span>
      </ItemDetail>
      <ItemDetail label="App details:" labelLayout="bolden">
        <Button label="Edit app details" onClick={() => updatePhase("phase-one")} />
      </ItemDetail>
      <ItemDetail label="App menu:" labelLayout="bolden">
        <Button label="Edit app menu" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
      <ItemDetail label="Remove app:" labelLayout="bolden">
        <Button label="Delete app" theme="btn-main btn-required" onClick={() => updatePhase("confirm-cancel")} />
      </ItemDetail>
    </div>
  );
};
export default AppContainer;
