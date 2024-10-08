import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const stripeAccountLink = async ({ dispatch, appId }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/stripe/account-link/${appId}`);
    dispatch({ type: APP_ACTIONS.SET_REDIRECT_URL, payload: data });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
