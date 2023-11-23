import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { DispatchMenuProp } from "reducer-dispatch-props";

export const setMenu = (props: DispatchMenuProp) => {
  const { dispatch, data } = props;
  dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: data });
};
