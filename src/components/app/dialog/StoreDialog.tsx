import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import AddMerch from "../forms/store/AddMerch";
import BuildStore from "../forms/store/BuildStore";
import EditStore from "../forms/store/EditStore";
import UpdateStripeConfig from "../forms/store/UpdateStripeConfig";
import DeleteStore from "../forms/store/DeleteStore";
import ViewOrdersContainer from "../containers/ViewOrdersContainer";

const StoreDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <BuildStore />}
      {status === "phase-two" && <EditStore />}
      {status === "phase-three" && <AddMerch />}
      {status === "phase-view-order" && <ViewOrdersContainer heading="View orders" />}
      {status === "configuration" && <UpdateStripeConfig />}
      {status === "confirm-cancel" && <DeleteStore />}
    </Dialog>
  );
};
export default StoreDialog;
