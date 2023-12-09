import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setActiveData = (props: AppDispatchProps) => {
  const { dispatch, menu, appName, logo, media, appId } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (menu) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: menu });
  if (appName) dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_NAME, payload: appName });
  if (logo) dispatch({ type: APP_ACTIONS.SET_ACTIVE_LOGO, payload: logo });
  if (media) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MEDIA, payload: media });
  if (appId) dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_ID, payload: appId });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
