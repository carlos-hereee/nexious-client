import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import ViewTasks from "@components/list/ViewTasks";
import EditAppDetails from "../forms/app/EditAppDetails";
import EditAppMenu from "../forms/app/EditAppMenu";
import ConfirmRemovals from "../containers/ConfirmRemoval";
import ViewMaps from "../ViewMaps";
import CreateMap from "../forms/app/CreateMap";
import CreateTaskBoard from "../forms/app/CreateTaskBoard";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName, taskBoard, getTaskBoard } = useContext(AppContext);

  console.log("taskBoard :>> ", taskBoard);
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "phase-view-task-event" && (
        <ViewTasks taskBoard={taskBoard} loadFunction={(id) => getTaskBoard({ id, appId })} />
      )}
      {status === "phase-add-task-event" && <CreateTaskBoard />}
      {status === "phase-view-event" && <ViewMaps />}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
