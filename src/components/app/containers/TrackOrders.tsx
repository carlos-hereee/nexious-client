import { AuthContext } from "@context/auth/AuthContext";
import { StoreContext } from "@context/store/StoreContext";
import { useContext } from "react";

// type MenuOptions = "pending" | "incomplete" | "complete" | "accepted";
interface TrackOrders {
  heading?: string;
  // order?: OrderSchema;
}

const TrackOrder = ({ heading }: TrackOrders) => {
  const { trackOrder } = useContext(StoreContext);
  const { orders } = useContext(AuthContext);
  // console.log("order :>> ", orders);
  // console.log("trackOrder:>> ", trackOrder);
  if (!orders) return <h2 className="heading">No orders yet</h2>;
  if (trackOrder)
    return (
      <div>
        <h2 className="heading">Track order</h2>
        <p>Status: {trackOrder.status}</p>
      </div>
    );
  return <div>{heading && <h1 className="heading">{heading}</h1>}</div>;
};

export default TrackOrder;
