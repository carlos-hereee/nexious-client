import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setAppData = (props: AppDispatchProps) => {
  const { dispatch, values } = props;
  if (values) {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    // if values exists other wise use default typec\
    console.log("values.landing :>> ", values.landing);
    if (values.logo) dispatch({ type: APP_ACTIONS.SET_APP_LOGO, payload: values.logo });
    if (values.adminIds) dispatch({ type: APP_ACTIONS.SET_ADMIN_IDS, payload: values.adminIds });
    if (values.appId) dispatch({ type: APP_ACTIONS.SET_APP_ID, payload: values.appId });
    if (values.locale) dispatch({ type: APP_ACTIONS.SET_LOCALE, payload: values.locale });
    if (values.appName) dispatch({ type: APP_ACTIONS.SET_APP_NAME, payload: values.appName });
    if (values.calendar) dispatch({ type: APP_ACTIONS.SET_CALENDAR, payload: values.calendar });
    if (values.landing) dispatch({ type: APP_ACTIONS.SET_LANDING, payload: values.landing });
    if (values.menu) dispatch({ type: APP_ACTIONS.SET_MENU, payload: values.menu });
    if (values.media) dispatch({ type: APP_ACTIONS.SET_MEDIA, payload: values.media });
    if (values.owner) dispatch({ type: APP_ACTIONS.SET_OWNER_ID, payload: values.owner });
    if (values.themeList) dispatch({ type: APP_ACTIONS.SET_THEME_LIST, payload: values.themeList });
    if (values.languageList) {
      dispatch({ type: APP_ACTIONS.SET_LANGUAGE_LIST, payload: values.languageList });
    }
    // if (values.newsletter) {
    //   dispatch({ type: APP_ACTIONS.SET_NEWSLETTER, payload: values.newsletter });
    // }
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
