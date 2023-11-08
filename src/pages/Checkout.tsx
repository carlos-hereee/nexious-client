import { useContext, useEffect } from "react";
import { AppContext } from "@context/app/AppContext";
import { AuthContext } from "@context/auth/AuthContext";
import { Cart, UserCard, PaymentMethods } from "nexious-library";
import { useNavigate } from "react-router-dom";
import {
  EmptySection,
  // Total
} from "nexious-library";
import { ServicesContext } from "@context/services/ServicesContext";

const Checkout = () => {
  const { checkout } = useContext(AppContext);
  const { cart, setTotal, total } = useContext(ServicesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      let cost = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.service.cost;
      }, 0);
      setTotal(cost);
    } else setTotal(0);
  }, [JSON.stringify(cart)]);
  const handleSubmit = (e) => console.log("submit", e, "success");
  const handlePaypal = (e) => console.log("e", e);
  const handleInStorePayment = (e) => console.log("e", e);
  return (
    <section className="flex-d-column">
      {cart.length > 0 ? (
        <Cart data={cart} heading={checkout.heading} />
      ) : (
        <EmptySection
          heading="Your cart is empty"
          message="Head to services"
          click={() => navigate("/services")}
        />
      )}
      {/* {total > 0 && <Total total={total} />} */}
      {user.uid ? (
        <div className="flex-d-column">
          <h2 className="heading">Your details</h2>
          <UserCard user={user.hero} hideHero isRow />
          <PaymentMethods
            data={checkout.paymentMethods}
            visaPayment={handleSubmit}
            paypalPayment={handlePaypal}
            inStorePayment={handleInStorePayment}
          />
        </div>
      ) : (
        <h2 className="heading">Enter user information</h2>
      )}
    </section>
  );
};

export default Checkout;
