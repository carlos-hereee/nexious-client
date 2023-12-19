import { AppContainerProps } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button } from "nexious-library";
import CopyToClipboard from "../sections/CopyToClipboard";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const AppContainer = (props: AppContainerProps) => {
  const { onAppDetails } = props;
  const { appUrl, locale } = useContext(AppContext);

  return (
    <div className="container">
      <h2 className="heading">App:</h2>
      <KeyWithDefinition label="App homepage: " labelLayout="bolden">
        {/* <CopyToClipboard data={appUrl} /> */}
        {onAppDetails && <Button label="Edit homepage" onClick={() => onAppDetails("phase-two")} />}
      </KeyWithDefinition>
      <KeyWithDefinition label="Copy app url: " labelLayout="bolden">
        <CopyToClipboard data={appUrl} />
      </KeyWithDefinition>
      <KeyWithDefinition label="App language:" labelLayout="bolden">
        {locale || "Comming soon "}
      </KeyWithDefinition>
      {onAppDetails && (
        <KeyWithDefinition label="App details:" labelLayout="bolden">
          <Button label="+ Edit app details" onClick={() => onAppDetails("phase-one")} />
        </KeyWithDefinition>
      )}
    </div>
  );
};
export default AppContainer;
