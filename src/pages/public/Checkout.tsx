import { useContext, useEffect, useState } from "react";
import { Button, Loading, PaymentMethods, Total } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "@context/store/StoreContext";
import { CartProps, PaymentMethod } from "store-context";
import { formatTotal } from "@formatters/store/formatPenniesToDollars";
// import { AppContext } from "@context/app/AppContext";
import { paymentMethods } from "@data/nexious.json";
// import { AuthContext } from "@context/auth/AuthContext";
import UserInformation from "@components/form/UserInformation";
import CartList from "@components/list/CartList";

const Checkout = () => {
  const { cart, onCheckOutSession, onStoreCheckout, error } = useContext(StoreContext);
  // const { user } = useContext(AuthContext);
  const [total, setTotal] = useState(0);
  const [storeIdx, setStore] = useState(0);
  const [active, setActive] = useState<CartProps>();
  const [paymentTypes, setPaymentTypes] = useState(paymentMethods);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart && cart.length > 0) {
      let methods = [...paymentMethods];
      // if stripe is not active remove as option
      if (!cart[storeIdx].isStripeActive) methods = methods.filter((method) => method.type !== "visa/credit");
      // set active store
      setActive(cart[storeIdx]);
      // set total for current store
      setTotal(formatTotal(cart[storeIdx].merch));
      // update payment method types
      setPaymentTypes(methods);
    }
  }, [storeIdx]);

  // return <UserInformation />;

  // no items in cart
  if (!cart || cart.length === 0) {
    return (
      <section className="btn-checkout-container">
        <Button
          label={`You have ${cart.length} items in your cart. Explore apps`}
          theme="btn btn-main btn-checkout"
          onClick={() => navigate("/explore")}
        />
      </section>
    );
  }
  // set loading screen if no store is active
  if (!active) return <Loading />;

  const handlePaymentClick = (data: PaymentMethod) => {
    if (data.type === "visa/credit") onCheckOutSession(active);
    if (data.type === "store") onStoreCheckout(active);
  };
  return (
    <section className="split-container">
      <CartList cart={cart} active={active} storeIdx={storeIdx} setTotal={setTotal} setStoreIdx={setStore} />
      <div className="container">
        <Total total={total} heading="Total:" />
        <UserInformation />
        <PaymentMethods data={paymentTypes} onClick={handlePaymentClick} errorMessage={error} />
      </div>
    </section>
  );
};

export default Checkout;
