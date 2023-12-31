import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { axiosAuth } from "@axios/axiosAuth";
import { ServicesDispatchProps } from "services-context";

export const checkOutSession = async (props: ServicesDispatchProps) => {
  const { dispatch, sessionCart } = props;
  try {
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: true });
    if (sessionCart) {
      // const checkoutCart = sessionCart.map((c) => {
      //   return { quantity: c.quantity, storeId: c.storeId, merchId: c.merchId, priceId: c.priceId };
      // });
      const { data } = await axiosAuth.post("/store/create-checkout-session", {
        cart: sessionCart,
      });
      // redirect
      document.location.href = data;
      // console.log("data :>> ", data);
      // dispatch({ type: SERVICE_ACTIONS.SET_STRIPE_SECRET, payload: data });
    }
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    console.log("error :>> ", error);
    dispatch({ type: SERVICE_ACTIONS.IS_LOADING, payload: false });
  }
};
