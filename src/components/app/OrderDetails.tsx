import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { OrderDetailsProps } from "store-context";
import { Button, MerchCard } from "nexious-library";
import { formatPenniesToDollars } from "@app/formatPenniesToDollars";
import OrderClientDetails from "./OrderClientDetails";

const OrderDetails = ({ order, onClick, labels }: OrderDetailsProps) => {
  const { inventory } = useContext(AppContext);
  return (
    <div className="container w-full" key={order.orderId}>
      <div className="container-row">
        <OrderClientDetails order={order} />
        {inventory && inventory.length > 0 && (
          <div className="container overflow-y">
            <strong>Order Details:</strong>
            {order.merch.map((m) => {
              const merchIdx = inventory.findIndex((i) => i.merchId === m.merchId);
              const merch = inventory[merchIdx];
              return (
                <MerchCard
                  key={m.merchId}
                  theme="merch-row"
                  hideButtons
                  data={{ ...merch, title: merch.name, cost: formatPenniesToDollars(merch.cost) }}
                  hero={{ url: merch.thumbnail }}
                >
                  <div className="merch-card-footer">
                    <strong>Quantity: {m.quantity}</strong>
                    {m.paymentStatus && (
                      <p>
                        <strong>Payment status: {m.paymentStatus}</strong>
                      </p>
                    )}
                  </div>
                </MerchCard>
              );
            })}
          </div>
        )}
      </div>
      <small className="flex-end">Order Id:{order.orderId}</small>
      {onClick && labels && (
        <div className="flex-center">
          {labels.accepted && <Button onClick={() => onClick("accepted")}>{labels?.accepted}</Button>}
          {labels.completed && <Button onClick={() => onClick("completed")}>{labels?.completed}</Button>}
          {labels.decline && (
            <Button onClick={() => onClick("decline")} theme="btn-main btn-cancel">
              {labels?.decline}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default OrderDetails;
