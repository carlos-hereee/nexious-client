import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import EditAppDetails from "../forms/app/EditAppDetails";
import EditAppMenu from "../forms/app/EditAppMenu";
import ConfirmRemovals from "../containers/ConfirmRemoval";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deleteApp } = useContext(AdminContext);
  const { appId, appName } = useContext(AppContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
      {status === "confirm-cancel" && <ConfirmRemovals name={appName} onConfirm={() => deleteApp(appId)} />}
    </Dialog>
  );
};
export default AppDialog;
