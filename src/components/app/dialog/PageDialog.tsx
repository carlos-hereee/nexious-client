import { useContext } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { Button, ButtonCancel, Dialog } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
import AddPage from "../forms/AddPage";
import EditLanding from "../forms/EditLanding";
import EditPage from "../forms/EditPage";

const PageDialog = ({ onClose, status, activePage }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { deletePage } = useContext(AdminContext);
  const { appId } = useContext(AppContext);

  const dialogPageHeader =
    status === "confirm-cancel"
      ? { heading: `Are you sure you want to delete ${activePage?.name}'s page`, data: `This will delete all progress` }
      : undefined;

  const handleConfirm = () => {
    if (activePage?.pageId) deletePage(appId, activePage.pageId);
  };
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={dialogPageHeader}>
      {status === "phase-one" && <AddPage />}
      {status === "phase-two" && <EditLanding />}
      {status === "phase-edit" && <EditPage />}
      {status === "confirm-cancel" && (
        <div className="flex-center">
          <ButtonCancel onClick={onClose} theme="btn-main" />
          <Button label="Confirm" onClick={handleConfirm} />
        </div>
      )}
    </Dialog>
  );
};
export default PageDialog;
