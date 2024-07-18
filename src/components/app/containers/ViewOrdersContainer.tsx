import { useEffect, useState } from "react";
import { Loading, Navigation } from "nexious-library";
import { OrderSchema, ViewOrderStatusKey } from "store-context";
import ViewOrders from "../ViewOrders";
import ViewOrdersDialog from "../dialog/ViewOrdersDialog";

type MenuOptions = "pending" | "incomplete" | "complete" | "accepted";
interface ViewOrderContainerProps {
  heading?: string;
  orders: OrderSchema[];
  onOrderClick?: (order: OrderSchema) => void;
}

const ViewOrdersContainer = ({ heading, orders, onOrderClick }: ViewOrderContainerProps) => {
  const [active, setNavigation] = useState<MenuOptions>("pending");
  const [activeOrder, setActiveOrder] = useState<OrderSchema | undefined>();
  const [activeOrders, setOrders] = useState<OrderSchema[]>(orders);

  useEffect(() => {
    if (active) {
      const o = orders.filter((order) => order.status === active);
      setOrders(o);
    }
  }, [active]);
  const statusKey: ViewOrderStatusKey = {
    pending: "phase-one",
    incomplete: "phase-two",
    complete: "phase-three",
    accepted: "phase-two",
  };
  if (!activeOrders) return <Loading />;
  const handleOrderClick = (o: OrderSchema) => {
    if (onOrderClick) onOrderClick(o);
    else setActiveOrder(o);
  };
  return (
    <div>
      {heading && <h1 className="heading">{heading}</h1>}
      <Navigation
        menus={["pending", "incomplete", "accepted", "complete"]}
        theme="navigation-bar"
        active={active}
        onClick={(m: MenuOptions) => setNavigation(m)}
      />
      {active === "pending" && <ViewOrders orders={activeOrders} heading="Pending Orders" onOrderClick={handleOrderClick} />}
      {active === "incomplete" && (
        <ViewOrders orders={activeOrders} heading="Incomplete Orders" onOrderClick={handleOrderClick} />
      )}
      {active === "accepted" && <ViewOrders orders={activeOrders} heading="Accepted Orders" onOrderClick={handleOrderClick} />}
      {active === "complete" && <ViewOrders orders={activeOrders} heading="Complete Orders" />}
      {activeOrder && (
        <ViewOrdersDialog status={statusKey[active]} order={activeOrder} onClose={() => setActiveOrder(undefined)} />
      )}
    </div>
  );
};

export default ViewOrdersContainer;
