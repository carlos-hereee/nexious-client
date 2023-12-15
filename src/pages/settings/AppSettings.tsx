import { useContext, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { useNavigate } from "react-router-dom";
import { Button, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import DangerZone from "@components/app/DangerZone";
import MediaContainer from "@components/app/containers/MediaContainer";
import PagesContainer from "@components/app/containers/PagesContainer";
import PageDialog from "@components/app/dialog/PageDialog";
import MediaDialog from "@components/app/dialog/MediaDialog";
import { DialogStatusProps, MediaItemProp, PageProps } from "app-types";
import StoreContainer from "@components/app/containers/StoreContainer";
import StoreDialog from "@components/app/dialog/StoreDialog";
import CopyToClipboard from "@components/app/sections/CopyToClipboard";

const AppSettings = () => {
  const {
    appName,
    media,
    pages,
    appId,
    isLoading,
    updateActiveAppData,
    logo,
    menu,
    appUrl,
    appLink,
  } = useContext(AppContext);
  const { deletePage, deleteMedia } = useContext(AdminContext);
  const [show, setShow] = useState({ pages: false, media: false, store: false });
  const [activePage, setActivePage] = useState<PageProps>();
  const [activeMedia, setActiveMedia] = useState<MediaItemProp>();
  const [status, setStatus] = useState<DialogStatusProps>("idle");
  const navigate = useNavigate();

  const dialogPageHeader = {
    heading: `Are you sure you want to delete ${activePage?.name}'s page`,
    data: `This will delete all progress`,
  };
  const dialogMediaHeader = {
    heading: `Are you sure you want to delete ${activeMedia?.media} `,
    data: `This will delete all progress`,
  };
  const mediaData = {
    medias: media.medias,
    heading: "Social media:",
    hint: "Click/Tap on icons to edit",
  };
  const storeData = { heading: "Store:" };
  const pagesData = { name: appUrl, heading: "Pages:" };

  const resetStatus = () => setStatus("idle");

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

  const onPageClose = () => setShow({ ...show, pages: false });
  const onAddMedia = () => {
    setShow({ ...show, media: true });
    setStatus("phase-two");
  };
  const handleSeeLive = () => {
    updateActiveAppData({ menu, appName, logo, media, appId });
    navigate(`/app/${appUrl}`);
  };
  const onAddMerch = () => {
    setShow({ ...show, store: true });
    setStatus("phase-two");
  };
  const onStoreEdit = () => {
    setShow({ ...show, store: true });
    setStatus("phase-one");
  };

  const onStoreDialogClose = () => {
    setShow({ ...show, store: false });
    resetStatus();
  };

  if (isLoading) return <Loading message="loading app assets.. " />;
  return (
    <div className="container">
      <h1 className="heading">App settings: {appName}</h1>
      <div className="navigation-container">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button label="Edit app" onClick={() => navigate(`/edit-app/${appLink}`)} />
        <Button label="See live" onClick={handleSeeLive} />
      </div>
      <PagesContainer data={pagesData} onRemove={onDeletePage} pages={pages} name={appLink} />
      <StoreContainer data={storeData} onAddItem={onAddMerch} onClick={onStoreEdit} />
      <MediaContainer data={mediaData} onMediaClick={handleMediaClick} onAddMedia={onAddMedia} />
      {show.pages && (
        <PageDialog onClose={onPageClose} onConfirm={handleConfirm} header={dialogPageHeader} />
      )}
      {show.media && (
        <MediaDialog
          media={activeMedia}
          status={status}
          header={status === "confirm-cancel" ? dialogMediaHeader : undefined}
          onClose={() => setShow({ ...show, media: false })}
          onCancel={(stat: DialogStatusProps) => setStatus(stat)}
          onConfirm={() => deleteMedia(appId, activeMedia?.uid || "")}
        />
      )}
      {show.store && <StoreDialog onClose={onStoreDialogClose} status={status} />}

      <CopyToClipboard data={appUrl} heading="Copy app url: " />
      <DangerZone />
    </div>
  );
};

export default AppSettings;
