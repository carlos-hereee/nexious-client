import { APP_ACTIONS } from "@actions/AppActions";
import { formatAppUrl, readableUrlString } from "@app/formatStringUrl";
import { AppDispatchProps } from "app-context";

export const setAppData = (props: AppDispatchProps) => {
  const { dispatch, app, appList } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (app) {
    // if values exists other wise use default typec\
    if (app.logo) dispatch({ type: APP_ACTIONS.SET_APP_LOGO, payload: app.logo });
    if (app.adminIds) dispatch({ type: APP_ACTIONS.SET_ADMIN_IDS, payload: app.adminIds });
    if (app.appId) dispatch({ type: APP_ACTIONS.SET_APP_ID, payload: app.appId });
    if (app.locale) dispatch({ type: APP_ACTIONS.SET_LOCALE, payload: app.locale });
    if (app.calendar) dispatch({ type: APP_ACTIONS.SET_CALENDAR, payload: app.calendar });
    if (app.landing) dispatch({ type: APP_ACTIONS.SET_LANDING, payload: app.landing });
    if (app.menu) dispatch({ type: APP_ACTIONS.SET_MENU, payload: app.menu });
    if (app.media) dispatch({ type: APP_ACTIONS.SET_MEDIA, payload: app.media });
    if (app.owner) dispatch({ type: APP_ACTIONS.SET_OWNER, payload: app.owner });
    if (app.themeList) dispatch({ type: APP_ACTIONS.SET_THEME_LIST, payload: app.themeList });
    if (app.pages) dispatch({ type: APP_ACTIONS.SET_PAGES, payload: app.pages });
    if (app.store) dispatch({ type: APP_ACTIONS.SET_STORE, payload: app.store });
    if (app.languageList) dispatch({ type: APP_ACTIONS.SET_LANGUAGES, payload: app.languageList });
    if (app.newsletter) dispatch({ type: APP_ACTIONS.SET_NEWSLETTER, payload: app.newsletter });
    if (app.appName) {
      const appLink = readableUrlString(app.appName);
      dispatch({ type: APP_ACTIONS.SET_APP_LINK, payload: appLink });
      dispatch({ type: APP_ACTIONS.SET_APP_URL, payload: formatAppUrl(appLink) });
      dispatch({ type: APP_ACTIONS.SET_APP_NAME, payload: app.appName });
    }
  }
  if (appList) dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: appList });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
