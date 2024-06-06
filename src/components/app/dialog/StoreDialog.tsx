import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext, useState } from "react";
import { Dialog } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import AddMerch from "../forms/store/AddMerch";
import BuildStore from "../forms/store/BuildStore";
import EditStore from "../forms/store/EditStore";
import UpdateStripeConfig from "../forms/store/UpdateStripeConfig";
import DeleteStore from "../forms/store/DeleteStore";
import ViewOrders from "../ViewOrders";

const StoreDialog = ({ onClose, status }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { store } = useContext(AppContext);
  const [superSeed, setSuperSeed] = useState(false);
  const [closePage, setClosePage] = useState(false);

  // const { store,  } = useContext(AppContext);

  const handleClose = () => {
    // when closing dialog if a secondary page is open close that page instead
    if (!superSeed) onClose();
    else setClosePage(true);
  };
  const handleSuperSeed = (d: boolean) => setSuperSeed(d);
  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={handleClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <BuildStore />}
      {status === "phase-two" && <EditStore />}
      {status === "phase-three" && <AddMerch />}
      {status === "phase-view-order-pending" && (
        <ViewOrders
          orders={store.pendingOrders || []}
          heading="Pending Orders"
          closePage={closePage}
          handleSuperSeed={handleSuperSeed}
        />
      )}
      {status === "configuration" && <UpdateStripeConfig />}
      {status === "confirm-cancel" && <DeleteStore />}
    </Dialog>
  );
};
export default StoreDialog;
