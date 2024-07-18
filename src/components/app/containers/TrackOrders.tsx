import { AuthContext } from "@context/auth/AuthContext";
import { useContext, useState } from "react";
import { OrderSchema } from "store-context";
import { Dialog } from "nexious-library";
import ViewOrdersContainer from "./ViewOrdersContainer";
import OrderClientDetails from "../OrderClientDetails";

const TrackOrder = () => {
  const { orders } = useContext(AuthContext);
  const [order, setOrder] = useState<OrderSchema | undefined>();
  if (!orders) return <h2 className="heading">No orders yet</h2>;
  // const handleOrderClick = (o: OrderSchema) => {
  //   console.log("o :>> ", o);
  // };
  return (
    <div className="container">
      <ViewOrdersContainer orders={orders} heading="My orders" onOrderClick={setOrder} />{" "}
      {order && (
        <Dialog onDialogClose={() => setOrder(undefined)}>
          <OrderClientDetails order={order} />
        </Dialog>
      )}
    </div>
  );
};

export default TrackOrder;
