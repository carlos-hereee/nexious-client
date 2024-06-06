import { STORE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const updateOrder = async ({ dispatch, option, appId, order }: StoreDispatchProps) => {
  // require key variable
  // require key variable
  if (!option) throw Error("option is required");
  if (!appId) throw Error("appId is required");
  if (!order) throw Error("order is required");
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.put(`/store/${appId}/order/${option}`, { order });

    console.log("data :>> ", data);
    // dispatch({ type: STORE_ACTIONS.SET_STRIPE_SECRET, payload: data });
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
