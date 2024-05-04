import { SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button } from "nexious-library";
import CopyToClipboard from "../sections/CopyToClipboard";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale } = useContext(AppContext);

  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");
  // <KeyWithDefinition label="App homepage: " labelLayout="bolden">
  //   {/* <CopyToClipboard data={appUrl} /> */}
  //   {updatePhase && <Button label="Edit homepage" onClick={() => updatePhase("phase-two")} />}
  // </KeyWithDefinition>
  return (
    <div className="container">
      <h2 className="heading">App:</h2>
      <KeyWithDefinition label="Copy app url: " labelLayout="bolden">
        <CopyToClipboard data={appUrl} />
      </KeyWithDefinition>
      <KeyWithDefinition label="App language:" labelLayout="bolden">
        {locale || "Coming Soon!"}
      </KeyWithDefinition>
      <KeyWithDefinition label="App details:" labelLayout="bolden">
        <Button label="Edit app details" onClick={() => updatePhase("phase-one")} />
      </KeyWithDefinition>
    </div>
  );
};
export default AppContainer;
