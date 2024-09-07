import { AuthContext } from "@context/auth/AuthContext";
import { Boards, DialogProps } from "app-types";
import { useContext, useEffect, useState } from "react";
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
import EditTaskBoard from "../forms/app/EditTaskBoard";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status, updateStatus }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName, taskBoards, getAllTaskBoard, requestStatus, setRequestStatus } = useContext(AppContext);
  const [activeBoard, setBoard] = useState<Boards>();

  useEffect(() => {
    if (requestStatus === "SUCCESS") {
      setRequestStatus("IDLE");
      if (updateStatus) updateStatus("idle");
      if (activeBoard) setBoard(undefined);
    }
  }, [requestStatus]);
  const handleEditClick = (value: Boards) => {
    if (updateStatus) updateStatus("phase-edit-task-event");
    setBoard(value);
  };
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "phase-view-task-event" && (
        <ViewBoards
          taskBoards={taskBoards}
          onAddClick={() => updateStatus && updateStatus("phase-add-task-event")}
          loadFunction={() => getAllTaskBoard({ appId })}
          onEditClick={handleEditClick}
        />
      )}
      {status === "phase-edit-task-event" && <EditTaskBoard taskBoard={activeBoard} />}
      {status === "phase-add-task-event" && <CreateTaskBoard />}
      {status === "phase-view-event" && <ViewMaps />}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
