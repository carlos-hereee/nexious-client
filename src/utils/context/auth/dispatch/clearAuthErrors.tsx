import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import data from "@data/data.json";

// reset auth errors
export const clearAuthErrors = ({ dispatch }: AuthDispatchProps) => {
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: data.resetAuthErrors });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
