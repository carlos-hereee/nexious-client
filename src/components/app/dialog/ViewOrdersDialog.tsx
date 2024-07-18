import { AuthContext } from "@context/auth/AuthContext";
import { DialogProps } from "app-types";
import { useContext } from "react";
import { Dialog, Loading } from "nexious-library";
import { AdminContext } from "@context/admin/AdminContext";
import { AppContext } from "@context/app/AppContext";
// import { ViewOrderStatusKey } from "store-context";
import OrderDetails from "../OrderDetails";

const ViewOrdersDialog = ({ onClose, status, order }: DialogProps) => {
  const { theme } = useContext(AuthContext);
  const { appId } = useContext(AppContext);
  const { handleOrderClick } = useContext(AdminContext);

  if (!order) return <Loading />;

  return (
    <Dialog theme={`alt-${theme}`} onDialogClose={onClose}>
      {/* TODO add preview store */}
      {status === "phase-one" && (
        <OrderDetails
          order={order}
          onClick={(option) => handleOrderClick({ order, option, appId, from: "pending" })}
          labels={{ accepted: "Reserve merch on hold", decline: "Decline order" }}
        />
      )}
      {status === "phase-two" && (
        <OrderDetails
          order={order}
          onClick={(option) => handleOrderClick({ order, option, appId, from: "incomplete" })}
          labels={{ completed: "Mark as complete", decline: "Decline order" }}
        />
      )}
      {status === "phase-three" && <OrderDetails order={order} />}
    </Dialog>
  );
};
export default ViewOrdersDialog;
