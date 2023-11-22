import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthDispatchStringProp } from "auth-context";

export const updateTheme = (props: AuthDispatchStringProp) => {
  const { dispatch, data } = props;
  dispatch({ type: AUTH_ACTIONS.SET_THEME, payload: data });
};
