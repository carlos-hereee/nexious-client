import { useContext, useEffect, useState } from "react";
import { OrderShema } from "store-context";
import { Navigation, UserCard, MerchCard, Button, Loading } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
// import { StoreContext } from "@context/store/StoreContext";

type MenuOptions = ["#", "status", "client", "payment type", "number of items", "location"] | string[];
interface ViewOrdersProps {
  orders: OrderShema[];
  heading?: string;
  menus?: MenuOptions;
}

const OrderDetails = ({ order, onClick }: { order: OrderShema; onClick: (option: "close" | "decline") => void }) => {
  const { inventory } = useContext(AppContext);
  // console.log("order :>> ", order);
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
        <Button onClick={() => onClick("decline")} theme="btn-main btn-cancel">
          Decline order
        </Button>
        <Button onClick={() => onClick("close")}>Close</Button>
      </div>
    </div>
  );
};
const ViewOrders = ({ orders, heading, menus }: ViewOrdersProps) => {
  const [active, setActive] = useState<string>("");
  const [activeMenu, setMenu] = useState<MenuOptions>();
  const [activeOrder, setActiveOrder] = useState<OrderShema | undefined>();

  useEffect(() => {
    // set navigation menus
    if (menus && menus.length > 0) {
      if (!active) setActive(menus[0]);
      setMenu(menus);
    } else setMenu(["#", "status", "client", "payment type", "number of items", "location"]);
  }, [active]);
  // console.log("orders :>> ", orders);
  // console.log("active :>> ", active);

  if (!activeMenu) return <Loading />;
  if (activeOrder) {
    const handleOrderClick = (option: "close" | "decline") => console.log("option :>> ", option);
    return <OrderDetails order={activeOrder} onClick={handleOrderClick} />;
  }

  return (
    <div className="primary-container">
      {heading && <h1 className="heading">{heading}</h1>}
      <Navigation menus={activeMenu} theme="navigation-bar" active={active} />
      {orders.map((order, idx) => (
        <Button theme="order-row" key={order.orderId} onClick={() => setActiveOrder(order)}>
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
