import { SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, Button, CopyButton } from "nexious-library";

const AppContainer = ({ updatePhase }: SettingsContainer) => {
  const { appUrl, locale, menu } = useContext(AppContext);

  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");

  console.log("menu :>> ", menu);

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
      <ItemDetail label="App menu:" labelLayout="bolden">
        <Button label="Edit app menu" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
    </div>
  );
};
export default AppContainer;
