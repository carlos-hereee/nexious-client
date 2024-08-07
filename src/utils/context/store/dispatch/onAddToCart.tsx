import { STORE_ACTIONS } from "@actions/StoreActions";
import { isDev } from "@config";
import { CartProps, StoreDispatchProps } from "store-context";

export const onAddToCart = ({ dispatch, merch, cart, store }: StoreDispatchProps) => {
  // require key variable
  if (!dispatch) throw Error("dispatch is required");
  if (!merch) throw Error("merch is required");
  if (!cart) throw Error("cart is required");
  if (!store) throw Error("store is required");
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    const storeIdx = cart.findIndex((c) => c.storeId === store.storeId);
    // if merch is already in cart added to
    if (storeIdx >= 0) {
      // add merch to cart
      const payload: CartProps[] = cart.map((c) => {
        if (c.storeId === store.storeId) return { ...store, merch: [...c.merch, merch] };
        return c;
      });
      dispatch({ type: STORE_ACTIONS.UPDATE_CART, payload });
      dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
    } else {
      // new merch item
      const payload = [...cart, { ...store, merch: [merch] }];
      dispatch({ type: STORE_ACTIONS.UPDATE_CART, payload });
      dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
    }
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
