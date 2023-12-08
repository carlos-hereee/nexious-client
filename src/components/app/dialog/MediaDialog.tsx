import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import EditMedia from "../media/EditMedia";

const MediaDialog = (props: DialogProps) => {
  const { onClose, onSubmit, onCancel, header, media, status } = props;
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {status === "confirm-cancel" ? null : (
        <EditMedia onCancelClick={onCancel} media={media} onSubmit={onSubmit} />
      )}
    </Dialog>
  );
};
export default MediaDialog;
