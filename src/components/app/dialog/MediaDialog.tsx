import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import EditMedia from "../media/EditMedia";
import AddMedia from "../media/AddMedia";

const MediaDialog = (props: DialogProps) => {
  const { onClose, onSubmit, onCancel, onConfirm, header, media, status } = props;
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {status === "confirm-cancel" ? (
        <div className="flex-center">
          {onCancel && <ButtonCancel onClick={() => onCancel("idle")} theme="btn-main" />}
          <Button label="Confirm" onClick={onConfirm} />
        </div>
      ) : status === "phase-two" ? (
        <AddMedia onCancelClick={onClose} />
      ) : (
        <EditMedia
          onCancelClick={() => onCancel && onCancel("confirm-cancel")}
          media={media}
          onSubmit={onSubmit}
        />
      )}
    </Dialog>
  );
};
export default MediaDialog;
