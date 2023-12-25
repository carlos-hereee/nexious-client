import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { ServicesDispatchProps } from "services-context";

export const onAddToCart = (props: ServicesDispatchProps) => {
  const { dispatch, merch, cart, store } = props;
  try {
    if (merch && cart && store) {
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
      const storeIdx = cart.findIndex((c) => c.storeId === store.storeId);
      // if merch is already in cart added to
      if (storeIdx >= 0) {
        // add merch to cart
        const payload = cart.map((c) => {
          if (c.storeId === store.storeId) return { ...store, merch: [...c.merch, merch] };
          return c;
        });
        dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload });
        dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
      } else {
        // new merch item
        const payload = [...cart, { ...store, merch: [merch] }];
        dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload });
        dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
