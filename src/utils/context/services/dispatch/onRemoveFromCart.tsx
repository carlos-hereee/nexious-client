import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { ServicesDispatchProps } from "services-context";

export const onRemoveFromCart = (props: ServicesDispatchProps) => {
  const { dispatch, merch, cart } = props;
  try {
    if (merch && cart) {
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
      // remove merch from cart
      const payload = cart.filter((c) => c.uid !== merch.uid);
      dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload });
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
    }
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
