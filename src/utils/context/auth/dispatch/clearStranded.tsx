import { A_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const clearStranded = ({ dispatch }: AuthDispatchProps) => {
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: A_ACTIONS.SET_ERROR, payload: { stranded: "" } });
  dispatch({ type: A_ACTIONS.IS_LOADING, payload: false });
};
