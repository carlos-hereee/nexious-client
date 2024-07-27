import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
// import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const createStripeAccount = async ({ dispatch, appId }: AppDispatchProps) => {
  try {
    // dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/store/build-stripe-store/${appId}`);
    dispatch({ type: APP_ACTIONS.SET_REDIRECT_URL, payload: data });
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: "Unable to create stripe account" });
  }
};
