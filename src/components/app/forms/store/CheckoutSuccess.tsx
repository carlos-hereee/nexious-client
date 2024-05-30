import { StoreContext } from "@context/store/StoreContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "nexious-library";
import ExploreApps from "@pages/public/ExploreApps";
import { OrderShema } from "store-context";

const ContinueShopping = () => {
  const { cart } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <>
      {cart.length > 0 && (
        <div className="container">
          <h2 className="heading">Stores still left to checkout {cart.length}</h2>
          <Button label="Continue to checkout" onClick={() => navigate("/checkout")} />
        </div>
      )}
      <ExploreApps featuredOnly heading="Explore stores" />
    </>
  );
};

const CheckoutSuccess = () => {
  const { confirmIntent, stripeConfirmation, order, cart, updateCart, setOrder } = useContext(StoreContext);
  const { search } = useLocation();
  const [orderData, setOrderData] = useState<OrderShema | undefined>();

  useEffect(() => {
    if (search) confirmIntent(search);
    if (order) {
      //  client will come to the store for pick up
      if (order.paymentMethod === "in-store") {
        const removal = cart.filter((c) => c.storeId !== order.store.storeId);
        updateCart(removal);
      }
      setOrderData(order);
      setOrder();
    }
  }, [order, search]);

  // if stripe checkout was successful
  if (stripeConfirmation.status === "complete" && stripeConfirmation.paymentStatus === "paid") {
    return (
      <div className="primary-container">
        <h1 className="heading">Thanks for your order!</h1>
        <p>
          We appreciate your business!
          {/* If you have any questions, please email */}
          {/* <a href="mailto:orders@example.com">orders@example.com</a>. */}
        </p>
        <ContinueShopping />
      </div>
    );
  }
  // if order checkout was successful
  if (orderData?.paymentMethod === "in-store") {
    // TODO: address click navigation
    return (
      <div className="primary-container">
        <h1 className="heading">Thanks for your order! {orderData.client.name}</h1>
        <p className="text-max text-center">
          We appreciate your business! If you have any questions, please email{" "}
          {orderData.store.email && <a href={`mailto:${orderData.store.email}`}>{orderData.store.email}</a>}
        </p>
        {orderData.store.location && (
          <p className="text-max text-center">
            We look forward to seeing you here! We are located at {orderData.store.location}
          </p>
        )}
        <ContinueShopping />
      </div>
    );
  }
  return (
    <div className="primary-container">
      <h1 className="heading">Thank you for visiting us!</h1>
      <ContinueShopping />
    </div>
  );
};
export default CheckoutSuccess;
