import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const managePayouts = async ({ appId, data, amount }: StoreDispatchProps) => {
  // dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
  const response = await axiosAuth.post(`store/stripe-account/${appId}/payouts/${data}`, { amount });
  return response;
  // dispatch({ type: STORE_ACTIONS.SET_STRIPE_BALANCE, payload: data });
  // dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
};
