import { UpdateAppProps } from "app-forms";
import { APP_ACTIONS } from "@app/utils/types/AppActions";

export const updateAppData = (props: UpdateAppProps) => {
  const { dispatch, values } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  // if values exists other wise use default type
  dispatch({ type: APP_ACTIONS.SET_APP_LOGO, payload: values?.logo || {} });
  dispatch({ type: APP_ACTIONS.SET_ADMIN_IDS, payload: values?.adminIds || [] });
  dispatch({ type: APP_ACTIONS.SET_APP_ID, payload: values?.appId || "" });
  dispatch({ type: APP_ACTIONS.SET_APP_NAME, payload: values?.appName || "" });
  dispatch({ type: APP_ACTIONS.SET_CALENDAR, payload: values?.calendar || {} });
  dispatch({ type: APP_ACTIONS.SET_LANDING, payload: values?.landing || {} });
  dispatch({ type: APP_ACTIONS.SET_NEWSLETTER, payload: values?.newsletter || {} });
  dispatch({ type: APP_ACTIONS.SET_MENU, payload: values?.menu || [] });
  dispatch({ type: APP_ACTIONS.SET_MEDIA, payload: values?.media || {} });
  dispatch({ type: APP_ACTIONS.SET_OWNER_ID, payload: values?.ownerId || "" });
  dispatch({ type: APP_ACTIONS.SET_THEME_LIST, payload: values?.themeList || [] });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
