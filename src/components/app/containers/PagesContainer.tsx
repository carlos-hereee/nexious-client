import { PagesContainerProps } from "app-types";
import PagesList from "@components/list/PagesList";
import { Button } from "nexious-library";
// import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import KeyWithDefinition from "../sections/KeyWithDefinition";

const PagesContainer = (props: PagesContainerProps) => {
  const { data, onRemove, name, onAddPage } = props;
  // const navigate = useNavigate();
  const { pages } = useContext(AppContext);

  if (!data) return <p>No pages added</p>;
  return (
    <div className="container">
      {data?.heading && <h2 className="heading">{data.heading}</h2>}
      <KeyWithDefinition label="Your pages:" labelLayout="bolden">
        <PagesList name={data?.name || name} onRemove={onRemove} pages={pages} />
      </KeyWithDefinition>
      <KeyWithDefinition label="More options:" labelLayout="bolden">
        {onAddPage && <Button label="+ Add Page" onClick={() => onAddPage("phase-one")} />}
      </KeyWithDefinition>
    </div>
  );
};
export default PagesContainer;
