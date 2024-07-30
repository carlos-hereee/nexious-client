import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useEffect, useState } from "react";
import { OrderSchema } from "store-context";
import { Button, Dialog } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import { useNavigate } from "react-router-dom";
import ViewOrdersContainer from "./ViewOrdersContainer";
import OrderClientDetails from "../OrderClientDetails";

const TrackOrder = () => {
  const { orders } = useContext(AuthContext);
  const { trackOrder, setTrackOrder } = useContext(StoreContext);
  const [order, setActiveOrder] = useState<OrderSchema | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    if (trackOrder) {
      setActiveOrder(trackOrder);
      setTrackOrder(undefined);
    }
  }, [trackOrder]);

  if (!orders || orders.length === 0)
    return (
      <div className="primary-container">
        <h2 className="heading text-center">No orders yet</h2>
        <Button label="Explore apps" onClick={() => navigate("/explore")} />
      </div>
    );

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
