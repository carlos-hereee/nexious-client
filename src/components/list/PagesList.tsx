import { PageProps, PagesContainerProps } from "app-types";
import PreviewPage from "@components/app/preview/PreviewPage";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";

const PagesList = ({ onRemove, updatePhase }: PagesContainerProps) => {
  const { pages, updateAppData } = useContext(AppContext);
  // require key variable
  if (!onRemove) throw Error("onRemove is required");
  if (!updatePhase) throw Error("updatePhase is required");
  if (!pages || pages.length === 0) return <p>No pages added. Add more pages to your app</p>;

  const handleEditPage = (p: PageProps) => {
    updateAppData({ page: p });
    updatePhase("phase-edit");
  };
  return (
    <div className="pages-container">
      {pages.map((page: PageProps) => (
        <div key={page.pageId} className="preview-card highlight">
          <PreviewPage
            preview={page}
            hero={page.hero}
            heading={page.name}
            onClick={() => handleEditPage(page)}
            layout="preview-thumbnail"
          />
          <button className="btn-remove" type="button" onClick={() => onRemove(page)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};
export default PagesList;
