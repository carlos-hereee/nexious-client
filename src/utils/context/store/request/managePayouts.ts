import { STORE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const managePayouts = async ({ dispatch, appId, data }: StoreDispatchProps) => {
  // dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.post(`store/stripe-account/${appId}/payouts/${data}`);
  console.log("data :>> ", data);
  // dispatch({ type: STORE_ACTIONS.SET_STRIPE_BALANCE, payload: data });
  // dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
};
