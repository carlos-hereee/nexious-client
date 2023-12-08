import { PagesContainerProps } from "app-types";
import { useNavigate } from "react-router-dom";
import PreviewPage from "../preview/PreviewPage";

const PagesContainer = (props: PagesContainerProps) => {
  const { name, handleDeletePage, pages } = props;
  const navigate = useNavigate();
  if (!pages) return <p>No pages added. Add more pages to your app</p>;
  return (
    <div className="section-container">
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
            <button className="btn-remove" type="button" onClick={() => handleDeletePage(page)}>
              X
            </button>
          </div>
        ))}
    </div>
  );
};
export default PagesContainer;
