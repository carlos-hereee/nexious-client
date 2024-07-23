import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const getStripeBalance = async ({ dispatch, appId }: StoreDispatchProps) => {
  dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get(`store/stripe-account/${appId}/balance`);
  dispatch({ type: STORE_ACTIONS.SET_STRIPE_BALANCE, payload: data });
  dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
};
