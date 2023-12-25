import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "@context/auth/AuthContext";
import { Cart, PaymentMethods, Total, Button } from "nexious-library";
// import { Cart, UserCard, PaymentMethods, Total, Button } from "nexious-library";
import { useNavigate } from "react-router-dom";
import { ServicesContext } from "@context/services/ServicesContext";
import { CartProps, MerchProps, PaymentMethod } from "services-context";
import { formatTotal } from "@formatters/store/formatPenniesToDollars";
// import { AppContext } from "@context/app/AppContext";

const Checkout = () => {
  const { cart, removeFromCart, paymentMethods, updateCart, onCheckOutSession } =
    useContext(ServicesContext);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [active, setActive] = useState<CartProps>();

  useEffect(() => {
    if (cart && cart.length > 0) {
      setActive(cart[page]);
      setTotal(formatTotal(cart[page].merch));
    }
  }, [page]);

  const onRemoveFromCart = (e: unknown) => {
    removeFromCart(cart, e as MerchProps);
  };

  const handleQuantity = (data: MerchProps, d: number) => {
    const oldValues = [...cart];
    const storeIdx = cart.findIndex((c) => c.storeId === data.storeId);
    const merchIdx = oldValues[storeIdx].merch.findIndex((c) => c.uid === data.uid);
    oldValues[storeIdx].merch[merchIdx].quantity = d;
    // oldValues[storeIdx].merch[merchIdx].cost = formatDollarsToPennies(data.cost);
    updateCart(oldValues);
    setTotal(formatTotal(oldValues[storeIdx].merch));
  };
  const handlePaymentClick = (data: PaymentMethod) => {
    if (active) {
      if (data.type === "visa/credit") onCheckOutSession(active);
    }
  };
  // console.log("active :>> ", active);
  return (
    <section className="container">
      {cart.length > 0 ? (
        <div className="split-container">
          {active && (
            <div className="container">
              <h1 className="heading">Checkout {active.name}</h1>
              {cart.length > 1 && (
                <div className="buttons-navigation">
                  {cart.map((c, idx) => (
                    <Button
                      label={c.name}
                      key={c.storeId}
                      theme={c.storeId === active.storeId && "btn-main btn-cta"}
                      onClick={() => setPage(idx)}
                    />
                  ))}
                </div>
              )}
              <Cart
                data={active.merch}
                heading="Review cart"
                removeFromCart={onRemoveFromCart}
                setQuantity={handleQuantity}
              />
            </div>
          )}
          <div className="container">
            <h2 className="heading">Total:</h2>
            <Total total={total} />
            <PaymentMethods data={paymentMethods} onClick={handlePaymentClick} />
          </div>
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
    </section>
  );
};

export default Checkout;
