import { PageProps, SettingsContainer } from "app-types";
import PagesList from "@components/list/PagesList";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { ItemDetail, Button } from "nexious-library";

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
      <ItemDetail label="Edit landing:" labelLayout="bolden">
        <Button label="Edit landing page" onClick={() => updatePhase("phase-two")} />
      </ItemDetail>
      <ItemDetail label="Your pages:" labelLayout="bolden">
        <PagesList name={appUrl} onRemove={onDeletePage} updatePhase={updatePhase} />
      </ItemDetail>
      <ItemDetail label="More options:" labelLayout="bolden">
        <Button label="+ Add Page" onClick={() => updatePhase("phase-one")} />
      </ItemDetail>
    </div>
  );
};
export default PagesContainer;
