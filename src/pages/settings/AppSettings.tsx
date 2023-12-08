import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Loading } from "nexious-library";
import { PageProps } from "app-context";
// import { AuthContext } from "@context/auth/AuthContext";
import { AdminContext } from "@context/admin/AdminContext";
// import AddMedia from "@components/app/forms/AddMedia";
import DangerZone from "@components/app/DangerZone";
import MediaContainer from "@components/app/containers/MediaContainer";
import PagesContainer from "@components/app/containers/PagesContainer";
import PageDialog from "@components/app/dialog/PageDialog";
import MediaDialog from "@components/app/dialog/MediaDialog";

const AppSettings = () => {
  const { appName, media, pages, appId, isLoading } = useContext(AppContext);
  // const { theme } = useContext(AuthContext);
  const { deletePage, deleteMedia } = useContext(AdminContext);
  // const { deletePage } = useContext(AdminContext);
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const [show, setShow] = useState({ pages: false, media: false });
  const [activePage, setActivePage] = useState<PageProps>();
  const navigate = useNavigate();

  const name = appName.split(" ").join("+");
  const appUrl = `${import.meta.env.VITE_CLIENT_URL}/app/${name}`;

  const dialogPageHeader = {
    heading: `Are you sure you want to delete page ${activePage?.name}`,
  };
  const mediaData = { medias: media.medias, heading: "Social media:" };
  const pagesData = { name, heading: "Pages:" };

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

  const onMediaRemove = (id: string) => deleteMedia(appId, id);
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
      <PagesContainer data={pagesData} onRemove={onDeletePage} pages={pages} />
      {show.pages && (
        <PageDialog onClose={onPageClose} onConfirm={handleConfirm} header={dialogPageHeader} />
      )}
      {show.media && <MediaDialog onClose={onMediaClose} />}
      <MediaContainer data={mediaData} onRemove={onMediaRemove} />
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
