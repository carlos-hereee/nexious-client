import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { ServicesDispatchProps } from "services-context";

export const checkoutStoreSession = async ({ dispatch, sessionCart }: ServicesDispatchProps) => {
  // require key variable
  if (!sessionCart) throw Error("sessionCart is required");
  try {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    const cart = sessionCart.merch.map((m) => ({ merchId: m.merchId, quantity: m.quantity || 1 }));
    const { data } = await axiosAuth.post(`/store/checkout-store-session/${sessionCart.storeId}`, { cart });
    // redirect
    // document.location.href = data;
    console.log("data :>> ", data);
    // dispatch({ type: SERVICE_ACTIONS.SET_STRIPE_SECRET, payload: data });
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
