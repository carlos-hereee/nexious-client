import { STORE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const trackCheckoutOrder = async ({ dispatch, orderId, accountId }: StoreDispatchProps) => {
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/store/${accountId}/track-order/${orderId}`);
    dispatch({ type: STORE_ACTIONS.SET_TRACK_ORDER, payload: data });
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
