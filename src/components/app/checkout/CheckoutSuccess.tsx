import { StoreContext } from "@context/store/StoreContext";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OrderSchema } from "store-context";
import SuccessDisplay from "./SuccessDisplay";
import ContinueShopping from "./ContinueShopping";

const CheckoutSuccess = () => {
  const { confirmIntent, stripeConfirmation, order, cart, updateCart, setOrder } = useContext(StoreContext);
  const { search } = useLocation();

  const [orderData, setOrderData] = useState<OrderSchema | undefined>();

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
  // stripe checkout was successful
  if (stripeConfirmation.status === "complete") {
    return (
      <div className="primary-container">
        {stripeConfirmation.paymentStatus === "paid" ? (
          <h1 className="heading text-center">Thanks for your order! {stripeConfirmation.customerDetails.email}</h1>
        ) : (
          <h1 className="heading text-center">Thanks for your order!</h1>
        )}
        <p>We appreciate your business!</p>
        <SuccessDisplay />
        <ContinueShopping />
      </div>
    );
  }
  // order checkout was successful
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
      <h1 className="heading text-center">Thank you for visiting us!</h1>
      <h2 className="heading text-center">Your order was submitted </h2>
      <ContinueShopping />
    </div>
  );
};
export default CheckoutSuccess;
