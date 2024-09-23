import { TaskBoardContext } from "@context/taskBoard/TaskBoardContext";
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
import AddPage from "../forms/app/AddPage";
import EditLanding from "../forms/app/EditLanding";
import EditPage from "../forms/app/EditPage";
import ViewTaskBoardRequests from "../ViewTaskBoardRequests";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status, updateStatus }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp, deletePage } = useContext(AdminContext);
  const { appId, requestStatus, setRequestStatus, activePage, taskBoard } = useContext(AppContext);
  const { createTaskBoard, taskBoardInvitation, editTaskBoard } = useContext(TaskBoardContext);
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
      {/* pages */}
      {status === "phase-three" && <EditLanding />}
      {status === "phase-edit" && <EditPage />}
      {status === "phase-add-page-event" && <AddPage />}
      {status === "confirm-event-cancel" && (
        <ConfirmRemovals onConfirm={() => deletePage({ appId, pageId: activePage.pageId })} />
      )}
      {/* task board */}
      {status === "phase-view-event" && (
        <ViewTaskBoardRequests
          taskBoard={taskBoard}
          onClick={(data) => taskBoardInvitation({ appId, id: taskBoard.boardId, ...data })}
        />
      )}
      {status === "phase-edit-task-event" && (
        <EditTaskBoard taskBoard={taskBoard} onSubmit={(values) => editTaskBoard({ appId, values, id: taskBoard.boardId })} />
      )}
      {status === "phase-add-task-event" && <CreateTaskBoard onSubmit={(values) => createTaskBoard({ values, appId })} />}
      {/* map */}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
