import { CartProps, MerchProps } from "store-context";
import { Cart, Button } from "nexious-library";
import { StoreContext } from "@context/store/StoreContext";
import { useContext } from "react";
import { formatTotal } from "@formatters/store/formatPenniesToDollars";

interface CartListProps {
  active: CartProps;
  storeIdx: number;
  cart: CartProps[];
  setTotal?: (total: number) => void;
  setStoreIdx?: (idx: number) => void;
}
const CartList = ({ cart, active, storeIdx, setTotal, setStoreIdx }: CartListProps) => {
  const { updateCart } = useContext(StoreContext);

  const handleRemove = (merch: MerchProps) => {
    // avoid mutating values
    const oldValues = [...cart];
    const removedMerch = oldValues[storeIdx].merch.filter((m) => m.merchId !== merch.merchId);
    // if removed merch was the last item in cart remove store from cart
    if (removedMerch.length === 0) {
      const removedStore = oldValues.filter((val) => val.storeId !== active.storeId);
      updateCart(removedStore);
    } else {
      // otherwise remove merch item
      oldValues[storeIdx].merch = removedMerch;
      // update cart
      updateCart(oldValues);
    }
  };
  const handleQuantity = (merch: MerchProps, d: number) => {
    // avoid mutating cart data
    const oldValues = [...cart];
    const merchIdx = oldValues[storeIdx].merch.findIndex((c) => c.uid === merch.uid);
    oldValues[storeIdx].merch[merchIdx].quantity = d;
    updateCart(oldValues);
    if (setTotal) setTotal(formatTotal(oldValues[storeIdx].merch));
  };
  return (
    <div className="container">
      <h1 className="heading">Checkout: {active.storeName}</h1>
      {cart.length > 1 && (
        <div className="buttons-navigation">
          {cart.map((c, idx) => (
            <Button
              label={c.storeName}
              key={c.storeId}
              theme={c.storeId === active.storeId && "btn-main"}
              onClick={() => setStoreIdx && setStoreIdx(idx)}
            />
          ))}
        </div>
      )}
      <Cart data={active.merch} heading="Review cart" removeFromCart={handleRemove} setQuantity={handleQuantity} />
    </div>
  );
};
export default CartList;
