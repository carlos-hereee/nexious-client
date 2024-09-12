import { PageProps, SettingsContainer } from "app-types";
import { useContext } from "react";
import { AppContext } from "@context/app/AppContext";
import { Button, CopyButton } from "nexious-library";

const PagesList = ({ onRemove, updatePhase }: SettingsContainer) => {
  const { pages, setActivePage, landing, appUrl } = useContext(AppContext);
  // require key variable
  if (!onRemove) throw Error("onRemove is required");
  if (!updatePhase) throw Error("updatePhase is required");
  if (!pages || pages.length === 0) return <p>No pages added. Add more pages to your app</p>;

  const handleEditPage = (p: PageProps) => {
    setActivePage(p);
    updatePhase("phase-edit");
  };
  return (
    <div className="pages-container">
      {landing && (
        <div className="btn-card highlight">
          <h4 className="heading">Landing page</h4>
          <CopyButton data={appUrl} />
          <Button label="Edit landing page" onClick={() => updatePhase("phase-three")} />
        </div>
      )}
      {pages.map((page: PageProps) => (
        <div key={page.pageId} className="btn-card pos-rel highlight">
          <h4 className="heading">{page.name || "no name"}</h4>
          <CopyButton data={page.pageLink} />
          <Button label="Edit page" onClick={() => handleEditPage(page)} />
          <button className="btn-remove" type="button" onClick={() => onRemove(page)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
};
export default PagesList;
