import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setActiveMenu = (props: AppDispatchProps) => {
  const { dispatch, menu, appName, logo } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (menu) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: menu });
  if (appName) dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_NAME, payload: appName });
  if (logo) dispatch({ type: APP_ACTIONS.SET_ACTIVE_LOGO, payload: logo });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
