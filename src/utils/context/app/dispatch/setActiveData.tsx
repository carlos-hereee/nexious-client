import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setActiveData = (props: AppDispatchProps) => {
  const { dispatch, menu, appName, logo, media, appId } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (menu) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: menu });
  if (logo) dispatch({ type: APP_ACTIONS.SET_ACTIVE_LOGO, payload: logo });
  if (media) dispatch({ type: APP_ACTIONS.SET_ACTIVE_MEDIA, payload: media });
  if (appId) dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_ID, payload: appId });
  if (appName) {
    document.title = appName;
    dispatch({ type: APP_ACTIONS.SET_ACTIVE_APP_NAME, payload: appName });
  }
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
