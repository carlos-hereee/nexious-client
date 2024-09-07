import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import EditAppDetails from "../forms/app/EditAppDetails";
import EditAppMenu from "../forms/app/EditAppMenu";
import ConfirmRemovals from "../containers/ConfirmRemoval";
import ViewMaps from "../ViewMaps";
import CreateMap from "../forms/app/CreateMap";
import CreateTaskBoard from "../forms/app/CreateTaskBoard";
import ViewBoards from "../ViewBoards";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status, updateStatus }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName, taskBoards } = useContext(AppContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "phase-view-task-event" && (
        <ViewBoards taskBoards={taskBoards} onAddClick={() => updateStatus && updateStatus("phase-add-task-event")} />
      )}
      {status === "phase-add-task-event" && <CreateTaskBoard />}
      {status === "phase-view-event" && <ViewMaps />}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
