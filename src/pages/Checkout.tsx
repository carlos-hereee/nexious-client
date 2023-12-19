import { useContext, useState } from "react";
// import { AuthContext } from "@context/auth/AuthContext";
import { Cart, PaymentMethods, Total, Button } from "nexious-library";
// import { Cart, UserCard, PaymentMethods, Total, Button } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { ServicesContext } from "@context/services/ServicesContext";
import { MerchProps, PaymentMethod } from "services-context";
import {
  formatDollarsToPennies,
  formatMerchFromPenniesToDollars,
  formatPenniesToDollars,
  formatTotal,
} from "@formatters/store/formatPenniesToDollars";
import { AppContext } from "@context/app/AppContext";

const Checkout = () => {
  const { cart, removeFromCart, paymentMethods, updateCart, onCheckOutSession } =
    useContext(ServicesContext);
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { store } = useContext(AppContext);
  const [total, setTotal] = useState(formatTotal(cart));
  const [active, setActive] = useState<PaymentMethod>();
  console.log("store :>> ", store);
  const cartData = formatMerchFromPenniesToDollars(cart);

  // console.log("stripeSecret :>> ", stripeSecret);

  // console.log("cart :>> ", cart);
  // console.log("user :>> ", user);

  // const handleSubmit = (e) => console.log("submit", e, "success");
  // const handlePaypal = (e) => console.log("e", e);
  // const handleInStorePayment = (e) => console.log("e", e);
  const onRemoveFromCart = (e: unknown) => {
    removeFromCart(cart, e as MerchProps);
  };

  const handleQuantity = (data: MerchProps, d: number) => {
    const oldValues = cart;
    const merchIdx = cart.findIndex((c) => c.uid === data.uid);
    oldValues[merchIdx].quantity = d;
    oldValues[merchIdx].cost = formatDollarsToPennies(data.cost);

    const t = formatTotal(oldValues);
    updateCart(oldValues);
    setTotal(t);
  };
  const handlePaymentClick = (data: PaymentMethod) => {
    setActive(data);
    if (data.type === "visa/credit") {
      onCheckOutSession(cart);
      // console.log("data :>> ", data);
    }
    // onCheckOutSession({ cart, payment: data, user });
  };
  return (
    <section className="container">
      {cart.length > 0 ? (
        <div className="split-container">
          <Cart
            data={cartData}
            heading="Review cart"
            removeFromCart={onRemoveFromCart}
            setQuantity={handleQuantity}
          />
          <PaymentMethods data={paymentMethods} onClick={handlePaymentClick} active={active} />
        </div>
      ) : (
        <div className="btn-checkout-container">
          <Button
            label={`You have ${cart.length} items in your cart. Explore apps`}
            theme="btn btn-main btn-checkout"
            onClick={() => navigate("/explore")}
          />
        </div>
      )}
      <Total total={formatPenniesToDollars(total)} />
    </section>
  );
};

export default Checkout;
