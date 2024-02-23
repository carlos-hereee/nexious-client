import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

// set accessToken
export const updateAccessToken = ({ dispatch, accessToken }: AuthDispatchProps) => {
  if (!accessToken) throw Error("accessToken is required");
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: accessToken });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
