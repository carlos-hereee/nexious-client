import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const billingPortal = async ({ dispatch, sessionId }: StoreDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`/store/stripe-billing-portal/${sessionId}`);
    if (data) window.location.href = data;
  } catch (error) {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
