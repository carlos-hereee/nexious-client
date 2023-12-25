import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setStripeConfig = (props: AppDispatchProps) => {
  const { dispatch, config } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (config) dispatch({ type: APP_ACTIONS.SET_STRIPE_CONFIG, payload: config });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
