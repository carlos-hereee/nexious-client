import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext, useEffect } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import AddMerch from "../store/AddMerch";
import BuildStore from "../store/BuildStore";
import EditStore from "../store/EditStore";

const StoreDialog = (props: DialogProps) => {
  const { onClose, header, status } = props;
  const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);
  const { formStatus } = useContext(AdminContext);

  useEffect(() => {
    if (formStatus) console.log("formStatus :>> ", formStatus);
    if (formStatus === "SUCCESS") onClose();
  }, [formStatus]);
  return (
    <Dialog theme={theme} onDialogClose={onClose} header={header}>
      {/* TODO add preview store */}
      {status === "phase-one" && store.storeId ? <EditStore /> : <BuildStore />}
      {status === "phase-two" && <AddMerch />}
    </Dialog>
  );
};
export default StoreDialog;
