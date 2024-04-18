import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";
import { DataResponse } from "utils/@types/response";

export const startStripeOnboarding = async ({ dispatch, appId }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data }: DataResponse = await axiosAuth.post(`/store/onboarding/${appId}`);
    dispatch({ type: APP_ACTIONS.SET_REDIRECT_URL, payload: data });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
