import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const updateTheme = async (props: AuthDispatchProps) => {
  //  key varaibles
  const { dispatch, data } = props;
  if (data) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_THEME, payload: data });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
