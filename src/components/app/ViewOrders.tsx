import { useEffect, useState } from "react";
import { OrderShema } from "store-context";
import { Navigation, Button, Loading } from "nexious-library";
import OrderDetails from "./OrderDetails";
// import { StoreContext } from "@context/store/StoreContext";

type MenuOptions = ["#", "status", "client", "payment type", "number of items", "location"] | string[];
type OrderOptions = "decline" | "complete";
interface ViewOrdersProps {
  orders: OrderShema[];
  heading?: string;
  closePage?: boolean;
  menus?: MenuOptions;
  onOrderClick?: (order: OrderShema, option: string) => void;
  handleSuperSeed?: (e: boolean) => void;
}

const ViewOrders = ({ orders, heading, menus, onOrderClick, handleSuperSeed, closePage }: ViewOrdersProps) => {
  const [active, setActive] = useState<string>("");
  const [activeMenu, setMenu] = useState<MenuOptions>();
  const [activeOrder, setActiveOrder] = useState<OrderShema | undefined>();

  useEffect(() => {
    if (active) {
      // sort orders with active
      // const ordersList = [...orders];
      // console.log("ordersList :>> ", ordersList);
    } else if (menus && menus.length > 0) {
      // set navigation menus
      setActive(menus[0]);
      setMenu(menus);
      // default menu
    } else setMenu(["#", "status", "client", "payment type", "number of items", "location"]);
  }, [active]);
  useEffect(() => {
    if (closePage && handleSuperSeed) {
      handleSuperSeed(false);
      setActiveOrder(undefined);
    }
  }, [closePage]);

  if (!activeMenu) return <Loading />;
  if (activeOrder) {
    const handleOrderClick = (option: OrderOptions) => {
      if (onOrderClick) onOrderClick(activeOrder, option);
      setActiveOrder(undefined);
    };
    return <OrderDetails order={activeOrder} onClick={handleOrderClick} />;
  }

  const handleActiveOrder = (order: OrderShema) => {
    setActiveOrder(order);
    // set secondary page to supperseed closing
    if (handleSuperSeed) handleSuperSeed(true);
  };

  return (
    <div className="primary-container">
      {heading && <h1 className="heading">{heading}</h1>}
      <Navigation menus={activeMenu} theme="navigation-bar" active={active} />
      {orders.map((order, idx) => (
        <Button theme="order-row" key={order.orderId} onClick={() => handleActiveOrder(order)}>
          <span>{idx + 1}</span>
          <span>{order.status}</span>
          <span>{order.client.name || order.client.email}</span>
          <span>{order.paymentMethod}</span>
          <span>{order.merch.length}</span>
          <span>{order.store.location || "no-location"}</span>
        </Button>
      ))}
    </div>
  );
};
export default ViewOrders;
