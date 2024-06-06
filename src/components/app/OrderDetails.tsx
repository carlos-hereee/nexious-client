import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { OrderShema } from "store-context";
import { Button, MerchCard, UserCard } from "nexious-library";

type OrderOptions = "decline" | "complete";
interface OrderDetailsProps {
  order: OrderShema;
  onClick: (option: OrderOptions) => void;
}
const OrderDetails = ({ order, onClick }: OrderDetailsProps) => {
  const { inventory } = useContext(AppContext);
  return (
    <div className="container w-full" key={order.orderId}>
      <div className="container-row">
        <div className="container">
          <strong>Client Details:</strong>
          <UserCard user={{ ...order.client, name: order.client.name || order.client.email }} />
        </div>
        <div className="container">
          <strong>Order Details:</strong>
          {order.merch.map((m) => {
            const merchIdx = inventory.findIndex((i) => i.merchId === m.merchId);
            const merch = inventory[merchIdx];
            return (
              <MerchCard key={m.merchId} hideButtons data={{ ...merch, title: merch.name }} hero={{ url: merch.thumbnail }}>
                <strong>Quantity: {m.quantity}</strong>
              </MerchCard>
            );
          })}
        </div>
      </div>
      <small className="flex-end">Order Id:{order.orderId}</small>
      <div className="flex-center">
        <Button onClick={() => onClick("complete")}>Mark as complete</Button>
        <Button onClick={() => onClick("decline")} theme="btn-main btn-cancel">
          Decline order
        </Button>
      </div>
    </div>
  );
};
export default OrderDetails;
