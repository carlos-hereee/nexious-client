import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import AddMerch from "../forms/store/AddMerch";
import BuildStore from "../forms/store/BuildStore";
import EditStore from "../forms/store/EditStore";
import UpdateStripeConfig from "../forms/store/UpdateStripeConfig";
import DeleteStore from "../forms/store/DeleteStore";

const StoreDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={theme} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <BuildStore />}
      {status === "phase-two" && <EditStore />}
      {status === "phase-three" && <AddMerch />}
      {status === "configuration" && <UpdateStripeConfig />}
      {/* {status === "configuration" && <UpdateStripeConfig />} */}
      {status === "confirm-cancel" && <DeleteStore onClose={onClose} />}
    </Dialog>
  );
};
export default StoreDialog;
