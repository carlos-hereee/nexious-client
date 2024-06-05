import { useContext, useEffect, useState } from "react";
import { OrderShema } from "store-context";
import { Navigation, UserCard, MerchCard } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
// import { StoreContext } from "@context/store/StoreContext";

interface ViewOrdersProps {
  orders: OrderShema[];
  heading?: string;
  menus?: string[];
}
const ViewOrders = ({ orders, heading, menus }: ViewOrdersProps) => {
  const [active, setActive] = useState<string>("");
  // const [activeMenu, setMenu] = useState<string[]>(menus);
  const { inventory } = useContext(AppContext);

  useEffect(() => {
    // set navigation menus
    if (menus && menus.length > 0) {
      if (!active) setActive(menus[0]);
      // else {
      //   const filteredMenu = menus.filter((menu) => menu === active);
      //   setMenu(filteredMenu);
      // }
    }
  }, [active]);
  // console.log("orders :>> ", orders);
  // console.log("active :>> ", active);
  // TODO: DESIGN ORDERS VIEW
  if (menus) {
    return (
      <div className="primary-container">
        {heading && <h1 className="heading">{heading}</h1>}
        <Navigation menus={menus} active={active} />
      </div>
    );
  }
  return (
    <div className="primary-container">
      {heading && <h1 className="heading">{heading}</h1>}
      {orders.map((order) => (
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
                  <MerchCard
                    key={m.merchId}
                    hideButtons
                    data={{ ...merch, title: merch.name }}
                    hero={{ url: merch.thumbnail }}
                  />
                );
              })}
            </div>
          </div>
          <small className="flex-end">Order Id:{order.orderId}</small>
        </div>
      ))}
    </div>
  );
};
export default ViewOrders;
