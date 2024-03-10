import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const clearStranded = ({ dispatch }: AuthDispatchProps) => {
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: { stranded: "" } });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
