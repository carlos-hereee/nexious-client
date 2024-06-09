import { STORE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { AxiosError } from "axios";
import { StoreDispatchProps } from "store-context";
import { errors } from "@data/data.json";

export const checkoutStoreSession = async ({ dispatch, sessionCart, user, merchandise }: StoreDispatchProps) => {
  // require key variable
  if (!sessionCart) throw Error("sessionCart is required");
  if (!merchandise) throw Error("merchandise is required");
  dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
  if (!user || !user.name || !user.email || !user.phone) {
    // checkout error client information is required
    dispatch({ type: STORE_ACTIONS.SET_ERROR, payload: errors.clientInformationRequired });
  } else {
    try {
      // reset error
      dispatch({ type: STORE_ACTIONS.SET_ERROR, payload: "" });
      const cart = merchandise.map((m) => ({ merchId: m.merchId, quantity: m.quantity || 1 }));
      const { data } = await axiosAuth.post(`/store/checkout-store-session/${sessionCart.storeId}`, { cart, client: user });
      dispatch({ type: STORE_ACTIONS.SET_STORE_ORDER, payload: data });
      dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
    } catch (error) {
      const res = error as AxiosError;
      dispatch({ type: STORE_ACTIONS.SET_ERROR, payload: res.response?.data as string });
      dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
