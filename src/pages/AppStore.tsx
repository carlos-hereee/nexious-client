import { AppContext } from "@context/app/AppContext";
import { PageProps } from "app-context";
import { useContext } from "react";
import { Hero, MerchCard } from "nexious-library";
import { MerchProps } from "services-context";
import { ServicesContext } from "@context/services/ServicesContext";

const AppStore = (props: { page: PageProps }) => {
  const { page } = props;
  const { store } = useContext(AppContext);
  const { cart, addToCart, removeFromCart } = useContext(ServicesContext);

  // console.log("store :>> ", store);

  // const onAddToCart = (data: unknown) => {
  //   console.log("data :>> ", data);
  // };
  // const onRemoveFromCart = (data: unknown) => {
  //   console.log("data :>> ", data);
  // };
  console.log("page :>> ", page);
  return (
    <div className="container">
      <div className="container">
        <h1 className="heading">{page.title}</h1>
        {page.hero && <Hero hero={{ url: page.hero }} />}
        {page.body && <p className="text-max">{page.body}</p>}
      </div>
      {store.merchendise?.map((merch) => (
        <MerchCard
          key={merch.uid}
          data={merch}
          hero={{ url: merch.hero }}
          onAddToCart={(data: MerchProps) => addToCart(cart, data)}
          onRemoveFromCart={(data: MerchProps) => removeFromCart(cart, data)}
          onClick={(data: MerchProps) => console.log("data :>> ", data)}
          canRemove={cart && cart.some((c: MerchProps) => c.uid === merch.uid)}
        />
      ))}
    </div>
  );
};
export default AppStore;
