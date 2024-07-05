import { A_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import data from "@data/data.json";

// reset auth errors
export const clearAuthErrors = ({ dispatch }: AuthDispatchProps) => {
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: A_ACTIONS.SET_ERROR, payload: data.resetAuthErrors });
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
};
