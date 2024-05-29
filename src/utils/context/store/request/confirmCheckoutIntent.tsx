import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { ServicesDispatchProps } from "store-context";

export const confirmCheckoutIntent = async (props: ServicesDispatchProps) => {
  const { dispatch, sessionId } = props;
  try {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get(`/store/confirm-intent/${sessionId}`);
    dispatch({ type: SERVICE_ACTIONS.SET_STRIPE_CONFIRMATION, payload: data });
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
