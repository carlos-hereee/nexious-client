import { useEffect, useState } from "react";
import { OrderOptions, OrderSchema } from "store-context";
import { Navigation, Button, Loading } from "nexious-library";
// import OrderDetails from "./OrderDetails";
// import { StoreContext } from "@context/store/StoreContext";

type MenuOptions = ["#", "order status", "client", "payment method", "number of items", "location"] | string[];
interface ViewOrdersProps {
  orders: OrderSchema[];
  heading?: string;
  menus?: MenuOptions;
  onOrderClick?: (order: OrderSchema, option: OrderOptions) => void;
}

const ViewOrders = ({ orders, heading, menus, onOrderClick }: ViewOrdersProps) => {
  const [active, setActive] = useState<string>("");
  const [activeMenu, setMenu] = useState<MenuOptions>();

  useEffect(() => {
    if (active) {
      // TODO: sort orders with active
      // const ordersList = [...orders];
      // console.log("ordersList :>> ", ordersList);
    } else if (menus && menus.length > 0) {
      // set navigation menus
      setActive(menus[0]);
      setMenu(menus);
      // default menu
    } else setMenu(["#", "order status", "client", "payment method", "number of items", "location"]);
  }, [active]);

  if (!activeMenu) return <Loading />;

  return (
    <div className="primary-container">
      {heading && <h2 className="heading">{heading}</h2>}
      <Navigation menus={activeMenu} theme="navigation-bar" active={active} />
      {orders.map((order, idx) => (
        <Button theme="order-row" key={order.orderId} onClick={() => onOrderClick && onOrderClick(order, "pending")}>
          <span>{idx + 1}</span>
          <span>{order.status}</span>
          <span>{order?.client?.name || order?.client?.email}</span>
          <span>{order.paymentMethod === "in-store" ? "in-store" : "online"}</span>
          <span>{order.merch.length}</span>
          <span>{(order.store && order.store.location) || "no-location"}</span>
        </Button>
      ))}
    </div>
  );
};
export default ViewOrders;
