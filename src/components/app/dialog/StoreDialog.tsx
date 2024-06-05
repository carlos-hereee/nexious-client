import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
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
  // const { store,  } = useContext(AppContext);

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && <BuildStore />}
      {status === "phase-two" && <EditStore />}
      {status === "phase-three" && <AddMerch />}
      {status === "phase-view-order-pending" && (
        <ViewOrders
          orders={
            store.pendingOrders || [
              {
                client: {
                  email: "97hernandez.c@gmail.com",
                  phone: "8322628018",
                  userId: "d404aa04-4c00-47d5-a1d3-62cf56e24ad6",
                },
                store: {
                  storeId: "4088a305-bc80-4c92-89e5-e6c498137590",
                  email: "97hernandez.c@gmail.com",
                  location: "",
                  location2: "",
                },
                status: "pending",
                paymentMethod: "in-store",
                merch: [
                  {
                    merchId: "9e33ca8b-59d7-4a48-a070-5593db57b211",
                    quantity: 1,
                    _id: "6657d586f26b32dd099ba6d7",
                  },
                ],
                orderId: "6657d585f26b32dd099ba6d6",
              },
            ]
          }
          // inventory={inventory}
          heading="Pending Orders"
        />
      )}
      {status === "configuration" && <UpdateStripeConfig />}
      {status === "confirm-cancel" && <DeleteStore />}
    </Dialog>
  );
};
export default StoreDialog;
