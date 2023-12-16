import { AppContext } from "@context/app/AppContext";
import { useContext } from "react";
import { Button, Hero, MerchCard } from "nexious-library";
import { MerchProps } from "services-context";
import { ServicesContext } from "@context/services/ServicesContext";
import { useNavigate } from "react-router-dom";

const AppStore = () => {
  const { store, activeAppName } = useContext(AppContext);
  const { cart, addToCart, removeFromCart } = useContext(ServicesContext);
  const navigate = useNavigate();

  console.log("page :>> ", store);
  return (
    <div className="container">
      <div className="container">
        {store.title && <h1 className="heading">{store.title}</h1>}
        {store.hero && <Hero hero={{ url: store.hero }} />}
        {store.body && <p className="text-max">{store.body}</p>}
      </div>
      {cart.length > 0 && (
        <Button
          label="Procced to checkout"
          theme="btn btn-main btn-checkout"
          onClick={() => navigate(`${activeAppName}/checkout`)}
        />
      )}
      {store.inventory?.map((merch: MerchProps) => (
        <MerchCard
          key={merch.uid}
          data={merch}
          hero={{ url: merch.hero }}
          onAddToCart={(data: MerchProps) => addToCart(cart, data)}
          onRemoveFromCart={(data: MerchProps) => removeFromCart(cart, data)}
          // TODO: on body click navigate to merch item details
          // onClick={(data: MerchProps) => console.log("data :>> ", data)}
          canRemove={cart && cart.some((c: MerchProps) => c.uid === merch.uid)}
        />
      ))}
    </div>
  );
};
export default AppStore;
