import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { ServicesDispatchProps } from "services-context";

export const requestSecret = async (props: ServicesDispatchProps) => {
  const { dispatch, cart } = props;
  try {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    if (cart) {
      const { data } = await axiosAuth.post("/store/request-secret", { cart });
      dispatch({ type: SERVICE_ACTIONS.SET_STRIPE_SECRET, payload: data });
    }
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
