import { PagesContainerProps } from "app-types";
import { useNavigate } from "react-router-dom";
import PreviewPage from "@components/app/preview/PreviewPage";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";

const PagesList = ({ name, onRemove }: PagesContainerProps) => {
  const navigate = useNavigate();
  const { pages } = useContext(AppContext);

  if (!pages || pages.length === 0) return <p>No pages added. Add more pages to your app</p>;

  return (
    <div className="pages-container">
      {pages?.length > 0 &&
        pages.map((page) => (
          <div key={page.pageId} className="preview-card highlight">
            <PreviewPage
              preview={page}
              hero={page.hero}
              heading={page.name}
              onClick={() => navigate(`/edit-page/${name}/page/${page.name}`)}
              layout="preview-thumbnail"
            />
            {onRemove && (
              <button className="btn-remove" type="button" onClick={() => onRemove(page)}>
                X
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
export default PagesList;
