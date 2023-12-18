import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { Cart, UserCard, PaymentMethods, Total, Button } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { ServicesContext } from "@context/services/ServicesContext";
import { MerchProps } from "services-context";
import {
  formatMerchFromPenniesToDollars,
  formatPenniesToDollars,
} from "@formatters/store/formatPenniesToDollars";

const Checkout = () => {
  // const { checkout } = useContext(AppContext);
  const { cart, removeFromCart, paymentMethods } = useContext(ServicesContext);
  // const { cart, setTotal, total } = useContext(ServicesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  // const { store } = useContext(AppContext);
  // console.log("store :>> ", store);

  const cartData = formatMerchFromPenniesToDollars(cart);
  // console.log("cart :>> ", cart);
  console.log("user :>> ", user);

  useEffect(() => {
    if (cart.length > 0) {
      const cost = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost;
      }, 0);
      setTotal(cost);
    } else setTotal(0);
  }, [JSON.stringify(cart)]);

  // const handleSubmit = (e) => console.log("submit", e, "success");
  // const handlePaypal = (e) => console.log("e", e);
  // const handleInStorePayment = (e) => console.log("e", e);
  const onRemoveFromCart = (e: unknown) => {
    removeFromCart(cart, e as MerchProps);
  };
  return (
    <section className="container">
      {cart.length > 0 ? (
        <Cart data={cartData} heading="Review cart" removeFromCart={onRemoveFromCart} />
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
      {user.userId ? (
        <div className="container">
          <h2 className="heading">Your details</h2>
          <UserCard user={user} hideHero isRow />
          <PaymentMethods
            data={paymentMethods}
            // visaPayment={handleSubmit}
            // paypalPayment={handlePaypal}
            // inStorePayment={handleInStorePayment}
          />
        </div>
      ) : (
        <h2 className="heading">Enter user information</h2>
      )}
    </section>
  );
};

export default Checkout;
