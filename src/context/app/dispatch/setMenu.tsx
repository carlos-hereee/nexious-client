import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { DispatchMenuProp } from "reducer-dispatch-props";

export const setMenu = (props: DispatchMenuProp) => {
  const { dispatch, data } = props;
  dispatch({ type: APP_ACTIONS.SET_APP_MENU, payload: data });
};
