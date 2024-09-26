import { CartProps, MerchProps } from "store-context";
import { Cart, Button } from "nexious-library";
import { useContext } from "react";
import { formatTotal } from "@app/formatPenniesToDollars";
import { CheckoutContext } from "@context/checkout/CheckoutContext";

type Menu = "All" | "Online" | "In store";
interface CartListProps {
  active: CartProps;
  storeIdx: number;
  activeNav?: string;
  navigation?: Menu[];
  merch: MerchProps[];
  setTotal?: (total: number) => void;
  setActiveNav?: (nav: Menu) => void;
}

const CartList = ({ active, storeIdx, setTotal, setActiveNav, activeNav, navigation, merch }: CartListProps) => {
  const { updateCart, cart } = useContext(CheckoutContext);

  const handleRemove = (merchandise: MerchProps) => {
    // avoid mutating values
    const oldValues = [...cart];
    const removedMerch = oldValues[storeIdx].merch.filter((m) => m.merchId !== merchandise.merchId);
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
  const handleQuantity = (merchandise: MerchProps, d: number) => {
    // avoid mutating cart data
    const oldValues = [...cart];
    const merchIdx = oldValues[storeIdx].merch.findIndex((c) => c.uid === merchandise.uid);
    oldValues[storeIdx].merch[merchIdx].quantity = d;
    updateCart(oldValues);
    if (setTotal) setTotal(formatTotal(oldValues[storeIdx].merch));
  };

  return (
    <div className="container">
      {navigation && navigation.length > 1 && (
        <div className="container">
          <h3 className="heading text-center required">**Some items are only availible at the store**</h3>
          <div className="buttons-navigation">
            {navigation.map((nav) => (
              <Button
                label={nav}
                key={nav}
                onClick={() => setActiveNav && setActiveNav(nav)}
                theme={activeNav === nav ? "btn-main btn-active" : "btn-main"}
              />
            ))}
          </div>
        </div>
      )}
      {merch && merch.length > 0 ? (
        <Cart
          data={merch}
          heading={activeNav ? undefined : "Review cart"}
          removeFromCart={handleRemove}
          setQuantity={handleQuantity}
          readOnly={activeNav && activeNav}
        />
      ) : (
        <p className="text-center">No more items availible for purchase</p>
      )}
    </div>
  );
};
export default CartList;
