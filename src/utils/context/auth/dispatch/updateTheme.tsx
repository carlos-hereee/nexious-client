import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { DispatchStringProp } from "reducer-dispatch-props";

export const updateTheme = (props: DispatchStringProp) => {
  const { dispatch, data } = props;
  dispatch({ type: AUTH_ACTIONS.SET_THEME, payload: data });
};
