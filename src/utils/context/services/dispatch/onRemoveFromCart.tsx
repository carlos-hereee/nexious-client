import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { ServicesDispatchProps } from "services-context";

export const onRemoveFromCart = (props: ServicesDispatchProps) => {
  const { dispatch, merch, cart } = props;
  try {
    if (merch && cart) {
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
      const storeIdx = cart.findIndex((c) => c.storeId === merch.storeId);

      // remove merch from cart
      const removal = cart[storeIdx].merch.filter((c) => c.uid !== merch.uid);
      if (removal.length > 0) {
        cart[storeIdx].merch = removal;
        dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload: cart });
      } else {
        const payload = cart.filter((c) => c.storeId !== merch.storeId);
        dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload });
      }
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
    }
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
