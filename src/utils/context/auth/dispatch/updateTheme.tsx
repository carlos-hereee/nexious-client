import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const updateTheme = async ({ data, dispatch }: AuthDispatchProps) => {
  //  key varaibles
  if (!data) throw Error("data is required");
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: AUTH_ACTIONS.SET_THEME, payload: data });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
