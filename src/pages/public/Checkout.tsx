import { useContext, useEffect, useState } from "react";
import { Button } from "nexious-library";
import { Cart, PaymentMethods, Total } from "nexious-library/@nxs-organism";
import { useNavigate } from "react-router-dom";
import { ServicesContext } from "@context/services/ServicesContext";
import { CartProps, MerchProps, PaymentMethod } from "services-context";
import { formatTotal } from "@formatters/store/formatPenniesToDollars";
// import { AppContext } from "@context/app/AppContext";
import { paymentMethods } from "@data/nexious.json";

const Checkout = () => {
  const { cart, removeFromCart, updateCart, onCheckOutSession } = useContext(ServicesContext);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [storeIdx, setStore] = useState(0);
  const [active, setActive] = useState<CartProps>();

  useEffect(() => {
    if (cart && cart.length > 0) {
      setActive(cart[storeIdx]);
      setTotal(formatTotal(cart[storeIdx].merch));
    }
  }, [storeIdx]);

  const onRemoveFromCart = (e: MerchProps) => {
    removeFromCart(cart, e as MerchProps);
  };

  const handleQuantity = (merch: MerchProps, d: number) => {
    // avoid mutating cart data
    const oldValues = [...cart];
    const merchIdx = oldValues[storeIdx].merch.findIndex((c) => c.uid === merch.uid);
    oldValues[storeIdx].merch[merchIdx].quantity = d;
    updateCart(oldValues);
    setTotal(formatTotal(oldValues[storeIdx].merch));
  };
  const handlePaymentClick = (data: PaymentMethod) => {
    if (active) {
      if (data.type === "visa/credit") onCheckOutSession(active);
      // TODO ADD REQUEST FOR INSTORE PAYMENTS
      // if (data.type === "store") onCheckOutSession(active);
    }
  };
  return (
    <section className="container">
      {cart.length > 0 ? (
        <div className="split-container">
          {active && (
            <div className="container">
              <h1 className="heading">Checkout: {active.storeName}</h1>
              {cart.length > 1 && (
                <div className="buttons-navigation">
                  {cart.map((c, idx) => (
                    <Button
                      label={c.storeName}
                      key={c.storeId}
                      theme={c.storeId === active.storeId && "btn-main btn-cta"}
                      onClick={() => setStore(idx)}
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
