import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { OrderSchema } from "store-context";
import { Dialog } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import ViewOrdersContainer from "./ViewOrdersContainer";
import OrderClientDetails from "../OrderClientDetails";

const TrackOrder = () => {
  const { orders } = useContext(AuthContext);
  const { trackOrder, setOrder } = useContext(StoreContext);
  const [order, setActiveOrder] = useState<OrderSchema | undefined>();
  useEffect(() => {
    if (trackOrder) {
      setActiveOrder(trackOrder);
      setOrder(undefined);
    }
  }, [trackOrder]);

  if (!orders) return <h2 className="heading">No orders yet</h2>;

  return (
    <div className="container">
      <ViewOrdersContainer orders={orders} heading="My orders" onOrderClick={setActiveOrder} />{" "}
      {order && (
        <Dialog onDialogClose={() => setActiveOrder(undefined)}>
          <OrderClientDetails order={order} />
        </Dialog>
      )}
    </div>
  );
};

export default TrackOrder;
