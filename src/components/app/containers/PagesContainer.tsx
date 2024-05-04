import { PageProps, SettingsContainer } from "app-types";
import PagesList from "@components/list/PagesList";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const PagesContainer = ({ updatePhase }: SettingsContainer) => {
  // require key variable
  if (!updatePhase) throw Error("updatePhase is required");
  const { appUrl, setActivePage } = useContext(AppContext);

  const onDeletePage = (data: PageProps) => {
    updatePhase("confirm-cancel");
    setActivePage(data);
  };
  return (
    <div className="container">
      <h2 className="heading">Pages:</h2>
      <KeyWithDefinition label="Edit landing:" labelLayout="bolden">
        <Button label="Edit landing page" onClick={() => updatePhase("phase-two")} />
      </KeyWithDefinition>
      <KeyWithDefinition label="Your pages:" labelLayout="bolden">
        <PagesList name={appUrl} onRemove={onDeletePage} updatePhase={updatePhase} />
      </KeyWithDefinition>
      <KeyWithDefinition label="More options:" labelLayout="bolden">
        <Button label="+ Add Page" onClick={() => updatePhase("phase-one")} />
      </KeyWithDefinition>
    </div>
  );
};
export default PagesContainer;
