import { PagesContainerProps } from "app-types";
import PagesList from "@components/list/PagesList";
import { Button } from "nexious-library";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const PagesContainer = ({ onRemove, name, onAddPage, onEditLanding }: PagesContainerProps) => {
  // require key variable
  if (!onEditLanding) throw Error("onEditLanding is required");
  if (!onAddPage) throw Error("onAddPage is required");
  const { appUrl } = useContext(AppContext);

  // if (!pages || pages.length === 0) return <p>No pages added</p>;
  return (
    <div className="container">
      <h2 className="heading">Pages:</h2>
      <KeyWithDefinition label="Edit landing:" labelLayout="bolden">
        <Button label="Edit landing page" onClick={() => onEditLanding()} />
      </KeyWithDefinition>
      <KeyWithDefinition label="Your pages:" labelLayout="bolden">
        <PagesList name={appUrl || name} onRemove={onRemove} />
      </KeyWithDefinition>
      <KeyWithDefinition label="More options:" labelLayout="bolden">
        <Button label="+ Add Page" onClick={() => onAddPage("phase-one")} />
      </KeyWithDefinition>
    </div>
  );
};
export default PagesContainer;
