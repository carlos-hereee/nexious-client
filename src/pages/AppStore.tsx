import { AppContext } from "@context/app/AppContext";
import { PageProps } from "app-types";
import { useContext } from "react";
import { Button, Hero, MerchCard } from "nexious-library";
import { MerchProps } from "services-context";
import { ServicesContext } from "@context/services/ServicesContext";
import { useNavigate } from "react-router-dom";

const AppStore = (props: { page: PageProps }) => {
  const { page } = props;
  const { store, activeAppName } = useContext(AppContext);
  const { cart, addToCart, removeFromCart } = useContext(ServicesContext);
  const navigate = useNavigate();

  // console.log("page :>> ", page);
  return (
    <div className="container">
      <div className="container">
        <h1 className="heading">{page.title}</h1>
        {page.hero && <Hero hero={{ url: page.hero }} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {cart.length > 0 && (
        <Button
          label="Procced to checkout"
          theme="btn btn-main btn-checkout"
          onClick={() => navigate(`${activeAppName}/checkout`)}
        />
      )}
      {store.merchendise?.map((merch: MerchProps) => (
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
