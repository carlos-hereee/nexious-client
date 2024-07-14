import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { OrderDetailsProps } from "store-context";
import { Button, ItemDetail, MerchCard, UserCard } from "nexious-library";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";

const OrderDetails = ({ order, onClick, labels }: OrderDetailsProps) => {
  const { inventory } = useContext(AppContext);
  return (
    <div className="container w-full" key={order.orderId}>
      <div className="container-row">
        <div className="container">
          <h3 className="heading">Client Details:</h3>
          <UserCard user={{ ...order.client, name: order.client.name || order.client.email }} />
          <h3 className="heading">Shipping Details:</h3>
          {order.client.address ? (
            <div className="container">
              <ItemDetail label="City">{order.client.address.city}</ItemDetail>
              <ItemDetail label="Country">{order.client.address.country}</ItemDetail>
              <ItemDetail label="Address 1">{order.client.address.line1}</ItemDetail>
              <ItemDetail label="Address 2">{order.client.address.line2}</ItemDetail>
              <ItemDetail label="Postal code">{order.client.address.postal_code}</ItemDetail>
              <ItemDetail label="State">{order.client.address.state}</ItemDetail>
            </div>
          ) : (
            <div className="primary-container">
              <p className="error-message text-center">Missing shipping details</p>
              <Button label="Request shipping formation" />
            </div>
          )}
        </div>
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
