import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext, useEffect } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import EditAppDetails from "../forms/app/EditAppDetails";
import EditAppMenu from "../forms/app/EditAppMenu";
import ConfirmRemovals from "../containers/ConfirmRemoval";
import CreateMap from "../forms/app/CreateMap";
import CreateTaskBoard from "../forms/app/CreateTaskBoard";
import EditTaskBoard from "../forms/app/EditTaskBoard";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status, updateStatus }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName, requestStatus, setRequestStatus } = useContext(AppContext);

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      setRequestStatus("IDLE");
      if (updateStatus) updateStatus("idle");
    }
  }, [requestStatus]);
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "phase-edit-task-event" && <EditTaskBoard />}
      {status === "phase-add-task-event" && <CreateTaskBoard />}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
