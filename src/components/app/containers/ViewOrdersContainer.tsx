import { useContext, useState } from "react";
import { Navigation } from "nexious-library";
import { AppContext } from "@context/app/AppContext";
import { OrderSchema, ViewOrderStatusKey } from "store-context";
import ViewOrders from "../ViewOrders";
import ViewOrdersDialog from "../dialog/ViewOrdersDialog";

type MenuOptions = "pending" | "incomplete" | "complete";

const ViewOrdersContainer = () => {
  const [active, setNavigation] = useState<MenuOptions>("pending");
  const { store } = useContext(AppContext);

  const [activeOrder, setActiveOrder] = useState<OrderSchema | undefined>();

  const statusKey: ViewOrderStatusKey = { pending: "phase-one", incomplete: "phase-two", complete: "phase-three" };

  return (
    <div>
      <h1 className="heading">View Orders</h1>
      <Navigation
        menus={["pending", "incomplete", "complete"]}
        theme="navigation-bar"
        active={active}
        onClick={(m: MenuOptions) => setNavigation(m)}
      />
      {active === "pending" && (
        <ViewOrders
          orders={store.pendingOrders || []}
          heading="Pending Orders"
          onOrderClick={(order) => setActiveOrder(order)}
        />
      )}
      {active === "incomplete" && (
        <ViewOrders
          orders={store.inCompleteOrders || []}
          heading="Incomplete Orders"
          onOrderClick={(order) => setActiveOrder(order)}
        />
      )}
      {active === "complete" && <ViewOrders orders={store.completedOrders || []} heading="Complete Orders" />}
      {activeOrder && (
        <ViewOrdersDialog status={statusKey[active]} order={activeOrder} onClose={() => setActiveOrder(undefined)} />
      )}
    </div>
  );
};

export default ViewOrdersContainer;
