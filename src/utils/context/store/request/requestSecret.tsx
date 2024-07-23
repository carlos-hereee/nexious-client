import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { StoreDispatchProps } from "store-context";

export const requestSecret = async (props: StoreDispatchProps) => {
  const { dispatch, cart } = props;
  try {
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: true });
    if (cart) {
      const { data } = await axiosAuth.post("/store/request-secret", { cart });
      dispatch({ type: STORE_ACTIONS.SET_STRIPE_SECRET, payload: data });
    }
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: false });
  }
};
