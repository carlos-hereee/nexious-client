import { OrderShema } from "store-context";

const ViewOrders = ({ orders }: { orders: OrderShema[] }) => {
  console.log("orders :>> ", orders);
  // TODO: DESIGN ORDERS VIEW
  return <div className="primary-container">VIEW ORDERS</div>;
};
export default ViewOrders;
