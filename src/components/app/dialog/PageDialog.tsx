import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import AddPage from "../forms/AddPage";

const PageDialog = (props: DialogProps) => {
  const { onClose, onConfirm, status, activePage } = props;
  const { theme } = useContext(AuthContext);

  const dialogPageHeader =
    status === "confirm-cancel"
      ? {
          heading: `Are you sure you want to delete ${activePage?.name}'s page`,
          data: `This will delete all progress`,
        }
      : undefined;
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={dialogPageHeader}>
      {status === "phase-one" && <AddPage />}
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
