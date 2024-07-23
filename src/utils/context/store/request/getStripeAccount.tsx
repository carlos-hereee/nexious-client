import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { StoreDispatchProps } from "store-context";

export const getStripeAccount = async ({ appId, dispatch }: StoreDispatchProps) => {
  // require key variable
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/store/stripe-account/${appId}`);
    dispatch({ type: STORE_ACTIONS.SET_STRIPE_CONFIG, payload: data.account });
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
