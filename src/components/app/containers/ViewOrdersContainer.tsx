import { useContext, useEffect, useState } from "react";
import { Loading, Navigation } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { OrderSchema, ViewOrderStatusKey } from "store-context";
import ViewOrders from "../ViewOrders";
import ViewOrdersDialog from "../dialog/ViewOrdersDialog";

type MenuOptions = "pending" | "incomplete" | "complete" | "accepted";
interface ViewOrderContainerProps {
  heading?: string;
}

const ViewOrdersContainer = ({ heading }: ViewOrderContainerProps) => {
  const [active, setNavigation] = useState<MenuOptions>("pending");
  // const { store, order } = useContext(AppContext);
  const { store } = useContext(AppContext);
  // const [orders, setOrders] = useState();
  const [activeOrder, setActiveOrder] = useState<OrderSchema | undefined>();

  const [activeOrders, setOrders] = useState<OrderSchema[]>();

  useEffect(() => {
    if (active) {
      const orders = store.orders ? store.orders.filter((order) => order.status === active) : [];
      setOrders(orders);
    }
  }, [active]);
  const statusKey: ViewOrderStatusKey = {
    pending: "phase-one",
    incomplete: "phase-two",
    complete: "phase-three",
    accepted: "phase-two",
  };
  if (!activeOrders) return <Loading />;
  return (
    <div>
      {heading && <h1 className="heading">{heading}</h1>}
      <Navigation
        menus={["pending", "incomplete", "accepted", "complete"]}
        theme="navigation-bar"
        active={active}
        onClick={(m: MenuOptions) => setNavigation(m)}
      />
      {active === "pending" && (
        <ViewOrders orders={activeOrders} heading="Pending Orders" onOrderClick={(order) => setActiveOrder(order)} />
      )}
      {active === "incomplete" && (
        <ViewOrders orders={activeOrders} heading="Incomplete Orders" onOrderClick={(order) => setActiveOrder(order)} />
      )}
      {active === "accepted" && (
        <ViewOrders orders={activeOrders} heading="Accepted Orders" onOrderClick={(order) => setActiveOrder(order)} />
      )}
      {active === "complete" && <ViewOrders orders={activeOrders} heading="Complete Orders" />}
      {activeOrder && (
        <ViewOrdersDialog status={statusKey[active]} order={activeOrder} onClose={() => setActiveOrder(undefined)} />
      )}
    </div>
  );
};

export default ViewOrdersContainer;
