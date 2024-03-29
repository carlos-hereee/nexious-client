import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import AddMerch from "../store/AddMerch";
import BuildStore from "../store/BuildStore";
import EditStore from "../store/EditStore";
import UpdateStripeConfig from "../store/UpdateStripeConfig";

const StoreDialog = (props: DialogProps) => {
  const { onClose, status } = props;
  const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && (store.storeId ? <EditStore /> : <BuildStore />)}
      {status === "phase-two" && <AddMerch />}
      {status === "configuration" && <UpdateStripeConfig />}
    </Dialog>
  );
};
export default StoreDialog;
