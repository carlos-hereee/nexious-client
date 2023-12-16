import { AppContainerProps } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button } from "nexious-library";
import CopyToClipboard from "../sections/CopyToClipboard";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const AppContainer = (props: AppContainerProps) => {
  const { data, onAppDetails } = props;
  const { appUrl, locale, landing } = useContext(AppContext);

  console.log("landing :>> ", landing);
  return (
    <div className="container">
      {data.heading && <h2 className="heading">{data.heading}</h2>}
      <KeyWithDefinition label="App language:" labelLayout="bolden">
        {locale || "Not set up "}
      </KeyWithDefinition>
      <KeyWithDefinition label="Copy app url: " labelLayout="bolden">
        <CopyToClipboard data={appUrl} />
      </KeyWithDefinition>
      <div className="flex-center">
        <Button label="+ Edit app details" onClick={onAppDetails} />
      </div>
    </div>
  );
};
export default AppContainer;
