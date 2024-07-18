import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import EditMedia from "../forms/media/EditMedia";
import AddMedia from "../forms/media/AddMedia";
import CreatePost from "../forms/media/CreatePost";

const MediaDialog = ({ onClose, onSubmit, onCancel, status }: DialogProps) => {
  if (!onCancel) throw Error("onCancel is required");

  const { theme } = useContext(AuthContext);
  const { appId, socialMedia } = useContext(AppContext);
  const { deleteMedia } = useContext(AdminContext);
  // require key variable
  const dialogMediaHeader =
    status === "confirm-cancel"
      ? {
          heading: `Are you sure you want to delete ${socialMedia?.media} `,
          data: `This will delete all progress`,
        }
      : undefined;
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose} header={dialogMediaHeader}>
      {status === "confirm-cancel" && (
        <div className="flex-center">
          <ButtonCancel onClick={() => onCancel("idle")} theme="btn-main" />
          <Button label="Confirm" onClick={() => deleteMedia({ appId, name: socialMedia.uid })} />
        </div>
      )}
      {status === "phase-one" && <EditMedia onCancelClick={() => onCancel("confirm-cancel")} onSubmit={onSubmit} />}
      {status === "phase-two" && <AddMedia onCancelClick={onClose} />}
      {status === "phase-three" && <CreatePost />}
    </Dialog>
  );
};
export default MediaDialog;
