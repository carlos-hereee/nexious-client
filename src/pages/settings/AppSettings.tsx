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
import { MediaItemProp } from "app-types";

const AppSettings = () => {
  const { appName, media, pages, appId, isLoading } = useContext(AppContext);
  const { deletePage, deleteMedia } = useContext(AdminContext);
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const [show, setShow] = useState({ pages: false, media: false });
  // const [show, setShow] = useState({ pages: false, media: false , cancelMedia:false});
  const [activePage, setActivePage] = useState<PageProps>();
  const [activeMedia, setActiveMedia] = useState<MediaItemProp>();
  const [status, setStatus] = useState<string>("idle");
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
  const handleMediaClick = (m: MediaItemProp) => {
    setShow({ ...show, media: true });
    setActiveMedia(m);
  };
  // deleteMedia(appId, id);

  // const onCancelMediaClose = () => setShow({ ...show, cancelMedia: false });
  const onPageClose = () => setShow({ ...show, pages: false });
  // const onMediaClose =;

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
      <MediaContainer data={mediaData} onMediaClick={handleMediaClick} />
      {show.pages && (
        <PageDialog onClose={onPageClose} onConfirm={handleConfirm} header={dialogPageHeader} />
      )}
      {show.media && (
        <MediaDialog
          onClose={() => setShow({ ...show, media: false })}
          onCancel={() => setStatus("confirm-cancel")}
          media={activeMedia}
          status={status}
        />
      )}

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
