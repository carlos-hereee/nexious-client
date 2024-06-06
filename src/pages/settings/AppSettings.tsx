import { useContext, useEffect, useState } from "react";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import MediaContainer from "@components/app/containers/MediaContainer";
import PagesContainer from "@components/app/containers/PagesContainer";
import PageDialog from "@components/app/dialog/PageDialog";
import MediaDialog from "@components/app/dialog/MediaDialog";
import { AppDialogProps, DialogShowProps, DialogStatusProps } from "app-types";
import StoreDialog from "@components/app/dialog/StoreDialog";
import AppContainer from "@components/app/containers/AppContainer";
import AppDialog from "@components/app/dialog/AppDialog";
import CalendarContainer from "@components/app/containers/CalendarContainer";
import { nexiousDashboardMenu, dashboardMenus as menus } from "@data/nexious.json";
import CalendarDialog from "@components/app/dialog/CalendarDialog";
import { Button, Loading } from "nexious-library";
import StoreContainer from "@components/app/containers/StoreContainer";
import DangerZone from "./DangerZone";

const AppSettings = () => {
  const { appName, dbVersion, upgradeToLatest, appId, redirectUrl, store } = useContext(AppContext);
  const { formStatus, setFormStatus } = useContext(AdminContext);
  const [show, setShow] = useState<AppDialogProps>(nexiousDashboardMenu);
  const [nav, setNav] = useState<keyof AppDialogProps>("store");
  const [status, setStatus] = useState<DialogStatusProps>("phase-one");

  useEffect(() => {
    // close form windows on form success
    if (formStatus === "SUCCESS") {
      // exception for store stripe configuration window
      if (nav !== "store" && status !== "configuration") {
        setShow({ pages: false, media: false, store: false, app: false, calendar: false, danger: false });
      }
      setFormStatus("IDLE");
    }
  }, [formStatus]);
  useEffect(() => {
    if (dbVersion) {
      if (dbVersion === "1.0.0") upgradeToLatest(appId);
    }
  }, [dbVersion]);
  useEffect(() => {
    if (redirectUrl) window.location.href = redirectUrl;
  }, [redirectUrl]);

  const handleClose = ({ name, stat }: DialogShowProps) => {
    setShow({ ...show, [name]: false });
    setStatus(stat);
  };

  const handleShow = ({ name, stat }: DialogShowProps) => {
    setShow({ ...show, [name]: true });
    setStatus(stat);
  };
  // console.log("store :>> ", store);
  // TODO: ADD CURRENCY TYPE TO STORE
  // TODO: ADD COUNTRY TO APP SETTINGS
  // TODO: UPDATE APP SETTING  NAVIGATION
  if (formStatus === "LOADING") return <Loading message="Request sent" />;
  return (
    <div className="container">
      <h1 className="heading">
        Settings <i>{appName}</i>: {nav}
      </h1>{" "}
      {/* {!dbVersion && (
        <div className="container flex-center">
          <h3>Notice!</h3>
          <p>Your app version is not up to date</p>
          <p>Some features may not work as intented</p>
          <Button label="Upgrade app" onClick={() => upgradeToLatest(appId)} />
        </div>
      )} */}
      <div className="navigation-container">
        {menus.map(({ label, value, theme, activeTheme }) => (
          <Button
            key={value}
            label={label}
            theme={nav === value ? activeTheme : theme}
            ping={value === "store" ? store.pendingOrders?.length || 0 : undefined}
            onClick={() => setNav(value as keyof AppDialogProps)}
          />
        ))}
      </div>
      {nav === "app" && <AppContainer updatePhase={(phase) => handleShow({ name: "app", stat: phase })} />}
      {nav === "pages" && <PagesContainer updatePhase={(phase) => handleShow({ name: "pages", stat: phase })} />}
      {nav === "media" && <MediaContainer updatePhase={(phase) => handleShow({ name: "media", stat: phase })} />}
      {nav === "calendar" && <CalendarContainer onPhaseClick={(phase) => handleShow({ name: "calendar", stat: phase })} />}
      {nav === "store" && <StoreContainer updatePhase={(phase) => handleShow({ name: "store", stat: phase })} />}
      {nav === "danger" && <DangerZone />}
      {show.pages && <PageDialog onClose={() => handleClose({ name: "pages", stat: "idle" })} status={status} />}
      {show.media && (
        <MediaDialog
          status={status}
          onClose={() => handleClose({ name: "media", stat: "idle" })}
          onCancel={(stat: DialogStatusProps) => setStatus(stat)}
        />
      )}
      {show.store && <StoreDialog onClose={() => handleClose({ name: "store", stat: "idle" })} status={status} />}
      {show.app && <AppDialog onClose={() => handleClose({ name: "app", stat: "idle" })} status={status} />}
      {show.calendar && <CalendarDialog onClose={() => handleClose({ name: "calendar", stat: "idle" })} status={status} />}
    </div>
  );
};

export default AppSettings;
