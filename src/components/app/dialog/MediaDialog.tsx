import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import EditMedia from "../media/EditMedia";
import AddMedia from "../media/AddMedia";

const MediaDialog = (props: DialogProps) => {
  const { onClose, onSubmit, onCancel, onConfirm, media, status } = props;
  const { theme } = useContext(AuthContext);
  const dialogMediaHeader =
    status === "confirm-cancel"
      ? {
          heading: `Are you sure you want to delete ${media?.media} `,
          data: `This will delete all progress`,
        }
      : undefined;
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={dialogMediaHeader}>
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
