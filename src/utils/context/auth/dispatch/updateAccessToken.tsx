import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const updateAccessToken = async (props: AuthDispatchProps) => {
  const { dispatch, accessToken } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    if (accessToken) {
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: accessToken });
    }
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
