import { SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail } from "nexious-library";
import { CopyButton } from "nexious-library/@nxs-molecules";
import { Button } from "nexious-library/@nxs-atoms";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale } = useContext(AppContext);

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
      <ItemDetail label="App details:" labelLayout="bolden">
        <Button label="Edit app details" onClick={() => updatePhase("phase-one")} />
      </ItemDetail>
    </div>
  );
};
export default AppContainer;
