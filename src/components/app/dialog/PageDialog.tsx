import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import AddPage from "../forms/AddPage";
import EditLanding from "../forms/EditLanding";

const PageDialog = ({ onClose, onConfirm, status, activePage }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  const dialogPageHeader =
    status === "confirm-cancel"
      ? { heading: `Are you sure you want to delete ${activePage?.name}'s page`, data: `This will delete all progress` }
      : undefined;
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={dialogPageHeader}>
      {status === "phase-one" && <AddPage />}
      {status === "phase-two" && <EditLanding onCancelClick={onClose} />}
      {status === "confirm-cancel" && (
        <div className="flex-center">
          <ButtonCancel onClick={onClose} theme="btn-main" />
          <Button label="Confirm" onClick={onConfirm} />
        </div>
      )}
    </Dialog>
  );
};
export default PageDialog;
