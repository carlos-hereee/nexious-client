import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import AddMerch from "../store/AddMerch";
import BuildStore from "../store/BuildStore";
import EditStore from "../store/EditStore";
import UpdateStripeConfig from "../store/UpdateStripeConfig";
import DeleteStore from "../store/DeleteStore";

const StoreDialog = ({ onClose, status }: DialogProps) => {
  const { store } = useContext(AppContext);
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && (store.storeId ? <EditStore /> : <BuildStore />)}
      {status === "phase-two" && <AddMerch />}
      {status === "configuration" && <UpdateStripeConfig />}
      {/* {status === "configuration" && <UpdateStripeConfig />} */}
      {status === "confirm-cancel" && <DeleteStore onClose={onClose} />}
    </Dialog>
  );
};
export default StoreDialog;
