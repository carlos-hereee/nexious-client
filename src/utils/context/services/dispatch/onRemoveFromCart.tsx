import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { ServicesDispatchProps } from "services-context";

export const onRemoveFromCart = ({ dispatch, merch, cart }: ServicesDispatchProps) => {
  // require key variable
  if (!dispatch) throw Error("dispatch is required");
  if (!merch) throw Error("merch is required");
  if (!cart) throw Error("cart is required");
  try {
    // avoid mutating data
    const oldValues = [...cart];
    console.log("oldValues :>> ", oldValues);
    console.log("merch :>> ", merch);
    // dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    // const storeIdx = oldValues.findIndex((c) => c.storeId === merch.storeId);

    // // remove merch from oldValues
    // const removal = oldValues[storeIdx].merch.filter((c) => c.uid !== merch.uid);
    // if (removal.length > 0) {
    //   oldValues[storeIdx].merch = removal;
    //   dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload: oldValues });
    // } else {
    //   const payload = cart.filter((c) => c.storeId !== merch.storeId);
    //   dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload });
    // }
    // dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
