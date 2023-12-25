import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const clearStranded = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: false });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
