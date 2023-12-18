import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { ServicesDispatchProps } from "services-context";

export const completeOrder = async (props: ServicesDispatchProps) => {
  const { dispatch, user, payment, cart } = props;
  try {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    if (user && payment && cart) {
      const { data } = await axiosAuth.post("/store/complete-checkout", { user, payment, cart });
      console.log("data :>> ", data);
    }
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
