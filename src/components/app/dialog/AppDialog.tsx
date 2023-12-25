import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { useFormStatusChecker } from "@hooks/useFormStatusChecker";
import EditAppDetails from "../forms/EditAppDetails";
import EditLanding from "../forms/EditLanding";

const AppDialog = (props: DialogProps) => {
  const { onClose, status } = props;
  const { theme } = useContext(AuthContext);

  // close dialog on success
  useFormStatusChecker(onClose);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <EditAppDetails onCancelClick={onClose} />}
      {status === "phase-two" && <EditLanding onCancelClick={onClose} />}
    </Dialog>
  );
};
export default AppDialog;
