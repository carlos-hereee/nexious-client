import { OrderSchema } from "store-context";
import { Button, ItemDetail, UserCard } from "nexious-library";

interface Props {
  order: OrderSchema;
  hideButton?: boolean;
}
const OrderClientDetails = ({ order, hideButton }: Props) => {
  return (
    <div className="container">
      <h3 className="heading">Client Details:</h3>
      <UserCard user={{ ...order.client, name: order.client?.name || order.client.email }} />
      <ItemDetail label="Order status:" labelLayout="bolden">
        <span>{order.status}</span>
      </ItemDetail>
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
          {hideButton && <Button label="Request shipping formation" />}
        </div>
      )}{" "}
    </div>
  );
};
export default OrderClientDetails;
