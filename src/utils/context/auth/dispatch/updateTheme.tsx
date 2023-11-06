import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { DispatchStringProp } from "reducer-dispatch-props";

export const updateTheme = (props: DispatchStringProp) => {
  const { dispatch, data } = props;
  dispatch({ type: APP_ACTIONS.SET_THEME, payload: data });
};
