import { A_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

// set accessToken
export const updateAccessToken = ({ dispatch, accessToken }: AuthDispatchProps) => {
  if (!accessToken) throw Error("accessToken is required");
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: A_ACTIONS.SET_ACCESS_TOKEN, payload: accessToken });
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
};
