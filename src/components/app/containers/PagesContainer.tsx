import { PagesContainerProps } from "app-types";
import PagesList from "@components/list/PagesList";
import { Button } from "nexious-library";
import { useNavigate } from "react-router-dom";

const PagesContainer = (props: PagesContainerProps) => {
  const { data, onRemove, pages, name } = props;
  const navigate = useNavigate();

  return (
    <div className="container">
      {data?.heading && <h2 className="heading">{data.heading}</h2>}
      <PagesList name={data?.name || name} onRemove={onRemove} pages={pages} />
      <div className="flex-center">
        <Button label="+ Add Page" onClick={() => navigate(`/add-page/${name}`)} />
      </div>
    </div>
  );
};
export default PagesContainer;
