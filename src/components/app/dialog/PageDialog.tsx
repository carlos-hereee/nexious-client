import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import AddPage from "../forms/AddPage";

const PageDialog = (props: DialogProps) => {
  const { onClose, onConfirm, header, status } = props;
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
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
