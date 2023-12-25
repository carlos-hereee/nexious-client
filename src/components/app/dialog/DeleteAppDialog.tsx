import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, ButtonCancel, Dialog } from "nexious-library";

const DeleteAppDialog = (props: DialogProps) => {
  const { onClose, onConfirm } = props;
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      <div className="flex-center">
        <ButtonCancel onClick={onClose} theme="btn-main" />
        <Button label="Confirm" onClick={onConfirm} />
      </div>
    </Dialog>
  );
};
export default DeleteAppDialog;
