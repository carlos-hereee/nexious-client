import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import EditAppDetails from "../forms/EditAppDetails";
import EditAppMenu from "../forms/app/EditAppMenu";
// import EditLanding from "../forms/EditLanding";

const AppDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails />}
      {status === "phase-two" && <EditAppMenu />}
    </Dialog>
  );
};
export default AppDialog;
