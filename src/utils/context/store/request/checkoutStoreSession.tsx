import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AxiosError } from "axios";
import { ServicesDispatchProps } from "store-context";

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
    const res = error as AxiosError;
    dispatch({ type: SERVICE_ACTIONS.SET_ERROR, payload: res.response?.data as string });
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
