import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { Button, Hero, MerchCard } from "nexious-library";
import { MerchProps } from "services-context";
import { ServicesContext } from "@context/services/ServicesContext";
import { useNavigate } from "react-router-dom";
import { formatPenniesToDollars } from "@forms/formatPenniesToDollars";

const AppStore = () => {
  const { store } = useContext(AppContext);
  const { cart, addToCart, removeFromCart } = useContext(ServicesContext);
  const navigate = useNavigate();
  // console.log("activeMenu :>> ", store);
  return (
    <div className="container">
      <div className="container">
        {store.title && <h1 className="heading">{store.title}</h1>}
        {store.hero && <Hero hero={{ url: store.hero }} />}
        {store.body && <p className="text-max">{store.body}</p>}
      </div>
      {cart.length > 0 && (
        <div className="btn-checkout-container">
          <Button
            label={`You have ${cart.length} items in your cart. Procced to checkout`}
            theme="btn btn-main btn-checkout"
            onClick={() => navigate("/checkout")}
          />
        </div>
      )}
      <div className="store-inventory-container">
        {store.inventory?.map((merch: MerchProps) => (
          <MerchCard
            key={merch.uid}
            data={{ ...merch, cost: formatPenniesToDollars(merch.cost) }}
            hero={{ url: merch.hero }}
            // onAddToCart={(data: MerchProps) => console.log(cart, data)}
            onAddToCart={(data: MerchProps) => addToCart(cart, data)}
            onRemoveFromCart={(data: MerchProps) => removeFromCart(cart, data)}
            // TODO: on body click navigate to merch item details
            // onClick={(data: MerchProps) => console.log("data :>> ", data)}
            canRemove={cart && cart.some((c: MerchProps) => c.uid === merch.uid)}
          />
        ))}
      </div>
    </div>
  );
};
export default AppStore;
