import { STORE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const confirmCheckoutIntent = async ({ dispatch, sessionId }: StoreDispatchProps) => {
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/store/confirm-intent/${sessionId}`);
    dispatch({ type: STORE_ACTIONS.SET_STRIPE_CONFIRMATION, payload: data });
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
