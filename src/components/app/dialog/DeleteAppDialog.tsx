import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";

const DeleteAppDialog = (props: DialogProps) => {
  const { onClose, onConfirm } = props;
  const { theme } = useContext(AuthContext);
  const { appName } = useContext(AppContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      <h2 className="heading">Are you sure you want to delete {appName}</h2>
      <p>This will delete all progress</p>
      <div className="flex-center">
        <ButtonCancel onClick={onClose} theme="btn-main" />
        <Button label="Confirm" onClick={onConfirm} />
      </div>
    </Dialog>
  );
};
export default DeleteAppDialog;
