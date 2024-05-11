import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";

const DeleteAppDialog = ({ onClose, onConfirm }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { appName } = useContext(AppContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      <h2 className="heading">Are you sure you want to delete {appName}</h2>
      <p>This will delete all progress</p>
      <div className="flex-center">
        <Button label="Cancel" onClick={onClose} />
        <Button label="Confirm" onClick={onConfirm} theme="btn-main btn-cancel" />
      </div>
    </Dialog>
  );
};
export default DeleteAppDialog;
