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
import CreateMap from "../CreateMap";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName, tasks } = useContext(AppContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "phase-view-task-event" && <ViewTasks tasks={tasks} />}
      {status === "phase-view-event" && <ViewMaps />}
      {status === "phase-add-event" && <CreateMap />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
