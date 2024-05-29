import { StoreContext } from "@context/store/StoreContext";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "nexious-library";

const CheckoutSuccess = () => {
  const { confirmIntent, stripeConfirmation, isLoading } = useContext(StoreContext);
  const { search } = useLocation();

  // console.log("stripeConfirmation :>> ", stripeConfirmation);
  useEffect(() => {
    confirmIntent(search);
  }, []);

  if (isLoading) return <Loading message="Fetching payment confirmation" />;
  if (stripeConfirmation.status === "complete" && stripeConfirmation.paymentStatus === "paid") {
    return (
      <div className="container">
        <h1 className="heading">Thanks for your order!</h1>
        <p>
          We appreciate your business!
          {/* If you have any questions, please email */}
          {/* <a href="mailto:orders@example.com">orders@example.com</a>. */}
        </p>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="heading">Something went wrong</h1>
    </div>
  );
};
export default CheckoutSuccess;
