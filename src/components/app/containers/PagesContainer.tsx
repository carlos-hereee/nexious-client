import { PagesContainerProps } from "app-types";
import PagesList from "@components/list/PagesList";
import { Button } from "nexious-library";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const PagesContainer = (props: PagesContainerProps) => {
  const { onRemove, name, onAddPage } = props;
  // const navigate = useNavigate();
  const { appUrl } = useContext(AppContext);

  // if (!pages || pages.length === 0) return <p>No pages added</p>;
  return (
    <div className="container">
      <h2 className="heading">Pages:</h2>
      <KeyWithDefinition label="Your pages:" labelLayout="bolden">
        <PagesList name={appUrl || name} onRemove={onRemove} />
      </KeyWithDefinition>
      <KeyWithDefinition label="More options:" labelLayout="bolden">
        {onAddPage && <Button label="+ Add Page" onClick={() => onAddPage("phase-one")} />}
      </KeyWithDefinition>
    </div>
  );
};
export default PagesContainer;
