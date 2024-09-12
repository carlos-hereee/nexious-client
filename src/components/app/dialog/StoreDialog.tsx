import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { AdminContext } from "@context/admin/AdminContext";
import AddMerch from "../forms/store/AddMerch";
import BuildStore from "../forms/store/BuildStore";
import EditStore from "../forms/store/EditStore";
import UpdateStripeConfig from "../forms/store/UpdateStripeConfig";
import ConfirmRemovals from "../containers/ConfirmRemoval";
// import ViewBalanceContainer from "../containers/ViewBalanceContainer";

const StoreDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { appId } = useContext(AppContext);
  const { deleteStore } = useContext(AdminContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <BuildStore />}
      {status === "phase-two" && <EditStore />}
      {status === "phase-three" && <AddMerch />}
      {/* {status === "phase-view-order" && <ViewOrdersContainer heading="View orders" orders={store.orders ? store.orders : []} />} */}
      {/* {status === "phase-view-balance" && <ViewBalanceContainer heading="View Balance" />} */}
      {status === "configuration" && <UpdateStripeConfig />}
      {status === "confirm-cancel" && <ConfirmRemovals onConfirm={() => deleteStore(appId)} />}
    </Dialog>
  );
};
export default StoreDialog;
