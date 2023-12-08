import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, IconButton, Loading } from "nexious-library";
import { PageProps } from "app-context";
import { AuthContext } from "@context/auth/AuthContext";
import { AdminContext } from "@context/admin/AdminContext";
import AddMedia from "@components/app/forms/AddMedia";
import DangerZone from "@components/app/DangerZone";
import MediaContainer from "@components/app/containers/MediaContainer";
import PagesContainer from "@components/app/containers/PagesContainer";
import PageDialog from "@components/app/dialog/PageDialog";

const AppSettings = () => {
  const { appName, media, pages, appId, isLoading } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  // const { deletePage, deleteMedia } = useContext(AdminContext);
  const { deletePage } = useContext(AdminContext);
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const [show, setShow] = useState({ pages: false, media: false });
  const [activePage, setActivePage] = useState<PageProps>();
  const navigate = useNavigate();

  const name = appName.split(" ").join("+");
  const appUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const dialogPageHeader = {
    heading: `Are you sure you want to delete page ${activePage?.name}`,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopyUrl(true);
  };
  const onDeletePage = (data: PageProps) => {
    setShow({ ...show, pages: true });
    setActivePage(data);
  };
  const handleConfirm = () => {
    setShow({ ...show, pages: false });
    if (activePage?.pageId) deletePage(appId, activePage.pageId);
  };
  const onPageClose = () => setShow({ ...show, pages: false });
  const onMediaClose = () => setShow({ ...show, media: false });

  if (isLoading) return <Loading message="loading app assets.. " />;
  return (
    <div className="container">
      <h1 className="heading">App settings: {appName}</h1>
      <div className="navigation-container">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button label="Edit app" onClick={() => navigate(`/edit-app/${name}`)} />
        <Button label="See live" onClick={() => navigate(`/app/${name}`)} />
        {/* <Button label="Support" /> */}
      </div>
      <PagesContainer data={{ name, heading: "Pages:" }} onRemove={onDeletePage} pages={pages} />
      {show.pages && (
        <PageDialog onClose={onPageClose} onConfirm={handleConfirm} header={dialogPageHeader} />
      )}
      <div className="container">
        <h2>Social medias:</h2>
        <MediaContainer data={media.medias} canRemove />
        {show.media && (
          <Dialog theme={theme} onDialogClose={onMediaClose}>
            <AddMedia onCancelClick={onMediaClose} />
          </Dialog>
        )}
        <div className="flex-center">
          <Button label="+ Add Social media" onClick={() => setShow({ ...show, media: true })} />
        </div>
      </div>
      <div className="section-row">
        <h2>Copy app url:</h2>
        <IconButton
          icon={{ icon: copyUrl ? "check" : "copy", label: appUrl }}
          onClick={copyLink}
          theme="btn-main"
        />
      </div>

      <DangerZone />
    </div>
  );
};

export default AppSettings;
