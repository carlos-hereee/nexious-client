import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AxiosError } from "axios";
import { ServicesDispatchProps } from "store-context";
import { errors } from "@data/data.json";

export const checkoutStoreSession = async ({ dispatch, sessionCart, user }: ServicesDispatchProps) => {
  // require key variable
  if (!sessionCart) throw Error("sessionCart is required");
  dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
  if (!user || !user.name || !user.email || !user.phone) {
    // checkout error client information is required
    dispatch({ type: SERVICE_ACTIONS.SET_ERROR, payload: errors.clientInformationRequired });
  } else {
    try {
      // reset error
      dispatch({ type: SERVICE_ACTIONS.SET_ERROR, payload: "" });
      const cart = sessionCart.merch.map((m) => ({ merchId: m.merchId, quantity: m.quantity || 1 }));
      const { data } = await axiosAuth.post(`/store/checkout-store-session/${sessionCart.storeId}`, { cart, client: user });
      // redirect
      // document.location.href = data;
      console.log("data :>> ", data);
      // dispatch({ type: SERVICE_ACTIONS.SET_STRIPE_SECRET, payload: data });
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
    } catch (error) {
      const res = error as AxiosError;
      console.log("res :>> ", res);
      dispatch({ type: SERVICE_ACTIONS.SET_ERROR, payload: res.response?.data as string });
      dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
