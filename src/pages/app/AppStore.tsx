import { AppContext } from "@context/app/AppContext";
import { useContext, useEffect } from "react";
import { MerchCard } from "nexious-library/@nxs-organism";
import { Hero } from "nexious-library/@nxs-molecules";
import { Button } from "nexious-library/@nxs-atoms";
import { MerchProps } from "services-context";
import { ServicesContext } from "@context/services/ServicesContext";
import { useNavigate } from "react-router-dom";
import { formatPenniesToDollars } from "@formatters/store/formatPenniesToDollars";
import UserMenu from "@components/app/UserMenu";

const AppStore = () => {
  const { store, getStoreInventory, inventory } = useContext(AppContext);
  const { cart, addToCart, updateCart } = useContext(ServicesContext);
  const navigate = useNavigate();

  const storeIdx = cart.findIndex((c) => c.storeId === store.storeId);

  useEffect(() => {
    // avoid redundant request if num of merch dont match get store inventory
    if (store.inventory.length !== inventory.length) getStoreInventory(store.storeId);
    // rerender request per store id
  }, [store.storeId]);

  const handleRemove = (merch: MerchProps) => {
    // avoid mutating values
    const oldValues = [...cart];
    const removedMerch = oldValues[storeIdx].merch.filter((m) => m.merchId !== merch.merchId);
    // if removed merch was the last item in cart remove store from cart
    if (removedMerch.length === 0) {
      const removedStore = oldValues.filter((val) => val.storeId !== store.storeId);
      updateCart(removedStore);
    } else {
      // otherwise remove merch item
      oldValues[storeIdx].merch = removedMerch;
      // update cart
      updateCart(oldValues);
    }
  };
  return (
    <div className="container">
      <UserMenu />
      <div className="container">
        {store.storeName && <h1 className="heading">Welcome to {store.storeName}</h1>}
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
        {inventory.length > 0 ? (
          inventory.map((merch: MerchProps) => (
            <MerchCard
              key={merch.uid}
              data={{ ...merch, cost: formatPenniesToDollars(merch.cost) }}
              hero={{ url: merch.hero }}
              // onAddToCart={(data: MerchProps) => console.log(cart, data)}
              onAddToCart={(data: MerchProps) => addToCart(cart, store, data)}
              onRemoveFromCart={(data: MerchProps) => handleRemove(data)}
              // TODO: on body click navigate to merch item details
              // onClick={(data: MerchProps) => console.log("data :>> ", data)}
              canRemove={storeIdx >= 0 && cart[storeIdx].merch.some((c: MerchProps) => c.uid === merch.uid)}
            />
          ))
        ) : (
          <div className="container flex-center w-max text-center">
            <h2 className="w-max">We are currently out of stock</h2>
            <p className="w-max"> Come back soon !</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default AppStore;
