import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setActiveMenu = (props: AppDispatchProps) => {
  const { dispatch, menu, appName } = props;
  if (menu) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: menu });
  if (appName) dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_NAME, payload: appName });
};
