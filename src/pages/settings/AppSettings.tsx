import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import DangerZone from "@components/app/DangerZone";
import MediaContainer from "@components/app/containers/MediaContainer";
import PagesContainer from "@components/app/containers/PagesContainer";
import PageDialog from "@components/app/dialog/PageDialog";
import MediaDialog from "@components/app/dialog/MediaDialog";
import { AppDialogProps, DialogShowProps, DialogStatusProps, MediaItemProp, PageProps } from "app-types";
import StoreDialog from "@components/app/dialog/StoreDialog";
import AppContainer from "@components/app/containers/AppContainer";
import AppDialog from "@components/app/dialog/AppDialog";
import StoreContainer from "@components/app/containers/StoreContainer";
import CalendarContainer from "@components/app/containers/CalendarContainer";
import { nexiousDashboardMenu } from "@data/nexious.json";
import CalendarDialog from "@components/app/dialog/CalendarDialog";

const AppSettings = () => {
  const { appName, appId } = useContext(AppContext);
  const { deleteMedia, formStatus, setFormStatus } = useContext(AdminContext);
  const [show, setShow] = useState<AppDialogProps>(nexiousDashboardMenu);
  const [activePage, setActivePage] = useState<PageProps>();
  const [activeMedia, setActiveMedia] = useState<MediaItemProp>();
  const [status, setStatus] = useState<DialogStatusProps>("phase-one");

  useEffect(() => {
    // close form windows on form success
    if (formStatus === "SUCCESS") {
      setShow({ pages: false, media: false, store: false, app: false, calendar: false });
      setFormStatus("IDLE");
    }
  }, [formStatus]);

  const onDeletePage = (data: PageProps) => {
    setShow({ ...show, pages: true });
    setActivePage(data);
    setStatus("confirm-cancel");
  };
  const handleMediaClick = (m: MediaItemProp) => {
    setShow({ ...show, media: true });
    setActiveMedia(m);
  };

  const handleClose = ({ dialogName, dialogStatus }: DialogShowProps) => {
    setShow({ ...show, [dialogName]: false });
    setStatus(dialogStatus);
  };

  const handleShow = ({ dialogName, dialogStatus }: DialogShowProps) => {
    setShow({ ...show, [dialogName]: true });
    setStatus(dialogStatus);
  };
  // TODO: ADD CURRENCY TYPE TO STORE
  // TODO: ADD COUNTRY TO APP SETTINGS
  // TODO: UPDATE APP SETTING  NAVIGATION
  return (
    <div className="container">
      <h1 className="heading">App settings: {appName}</h1>
      {/* <div className="navigation-container">
        <Button label="Dashboard" onClick={() => navigate("/dashboard")} />
        <Button label="Edit app" onClick={() => navigate(`/edit-app/${appLink}`)} />
        <Button label="See live" onClick={() => navigate(`/app/${appLink}`)} />
      </div> */}
      <AppContainer onAppDetails={(phase) => handleShow({ dialogName: "app", dialogStatus: phase })} />
      <PagesContainer
        onRemove={onDeletePage}
        updatePhase={(phase) => handleShow({ dialogName: "pages", dialogStatus: phase })}
      />
      <MediaContainer
        onMediaClick={handleMediaClick}
        onAdd={(phase) => handleShow({ dialogName: "media", dialogStatus: phase })}
      />
      <CalendarContainer onPhaseClick={(phase) => handleShow({ dialogName: "calendar", dialogStatus: phase })} />
      <StoreContainer onPhaseClick={(phase) => handleShow({ dialogName: "store", dialogStatus: phase })} />
      {show.pages && (
        <PageDialog
          onClose={() => handleClose({ dialogName: "pages", dialogStatus: "idle" })}
          status={status}
          activePage={activePage}
        />
      )}
      {show.media && (
        <MediaDialog
          media={activeMedia}
          status={status}
          onClose={() => handleClose({ dialogName: "media", dialogStatus: "idle" })}
          onCancel={(stat: DialogStatusProps) => setStatus(stat)}
          onConfirm={() => deleteMedia(appId, activeMedia?.uid || "")}
        />
      )}
      {show.store && (
        <StoreDialog onClose={() => handleClose({ dialogName: "store", dialogStatus: "idle" })} status={status} />
      )}
      {show.app && <AppDialog onClose={() => handleClose({ dialogName: "app", dialogStatus: "idle" })} status={status} />}
      {show.calendar && (
        <CalendarDialog onClose={() => handleClose({ dialogName: "calendar", dialogStatus: "idle" })} status={status} />
      )}
      <DangerZone />
    </div>
  );
};

export default AppSettings;
