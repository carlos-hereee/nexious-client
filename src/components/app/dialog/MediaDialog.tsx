import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import EditMedia from "../forms/media/EditMedia";
import AddMedia from "../forms/media/AddMedia";
import CreatePost from "../forms/media/CreatePost";
import ConfirmRemovals from "../containers/ConfirmRemoval";

const MediaDialog = ({ onClose, onSubmit, onCancel, status }: DialogProps) => {
  if (!onCancel) throw Error("onCancel is required");

  const { theme } = useContext(AuthContext);
  const { appId, socialMedia } = useContext(AppContext);
  const { deleteMedia } = useContext(AdminContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {status === "confirm-cancel" && (
        <ConfirmRemovals name={socialMedia.media} onConfirm={() => deleteMedia({ appId, name: socialMedia.media })} />
      )}
      {status === "phase-one" && <EditMedia onCancelClick={() => onCancel("confirm-cancel")} onSubmit={onSubmit} />}
      {status === "phase-two" && <AddMedia onCancelClick={onClose} />}
      {status === "phase-three" && <CreatePost />}
    </Dialog>
  );
};
export default MediaDialog;
