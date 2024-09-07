import { APP_ACTIONS } from "@actions/AppActions";
import { formatAppUrl, readableUrlString } from "@app/formatStringUrl";
import { AppDispatchProps } from "app-context";

export const setAppData = ({ dispatch, app, appList, store, page, platformTiers }: AppDispatchProps) => {
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  if (app) {
    // assign values if they exists
    if (app.logo) dispatch({ type: APP_ACTIONS.SET_APP_LOGO, payload: app.logo });
    if (app.adminIds) dispatch({ type: APP_ACTIONS.SET_ADMIN_IDS, payload: app.adminIds });
    if (app.appId) dispatch({ type: APP_ACTIONS.SET_APP_ID, payload: app.appId });
    if (app.dbVersion) dispatch({ type: APP_ACTIONS.SET_DB_VERSION, payload: app.dbVersion });
    if (app.maps) dispatch({ type: APP_ACTIONS.SET_APP_MAPS, payload: app.maps });
    if (app.posts) dispatch({ type: APP_ACTIONS.SET_APP_POSTS, payload: app.posts });
    if (app.locale) dispatch({ type: APP_ACTIONS.SET_LOCALE, payload: app.locale });
    if (app.calendar) dispatch({ type: APP_ACTIONS.SET_CALENDAR, payload: app.calendar });
    if (app.landing) dispatch({ type: APP_ACTIONS.SET_LANDING, payload: app.landing });
    if (app.menu) dispatch({ type: APP_ACTIONS.SET_MENU, payload: app.menu });
    if (app.media) dispatch({ type: APP_ACTIONS.SET_MEDIA, payload: app.media });
    if (app.owner) dispatch({ type: APP_ACTIONS.SET_OWNER, payload: app.owner });
    if (app.themeList) dispatch({ type: APP_ACTIONS.SET_THEME_LIST, payload: app.themeList });
    if (app.notifications) dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: app.notifications });
    if (app.pages) dispatch({ type: APP_ACTIONS.SET_PAGES, payload: app.pages });
    if (app.languageList) dispatch({ type: APP_ACTIONS.SET_LANGUAGES, payload: app.languageList });
    if (app.store) dispatch({ type: APP_ACTIONS.SET_STORE, payload: app.store });
    if (app.newsletter) dispatch({ type: APP_ACTIONS.SET_NEWSLETTER, payload: app.newsletter });
    if (app.messages) dispatch({ type: APP_ACTIONS.SET_APP_MESSAGES, payload: app.messages });
    if (app.taskBoard) dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: app.taskBoard });
    if (app.appName) {
      const appLink = readableUrlString(app.appName);
      dispatch({ type: APP_ACTIONS.SET_APP_LINK, payload: appLink });
      dispatch({ type: APP_ACTIONS.SET_APP_URL, payload: formatAppUrl(appLink) });
      dispatch({ type: APP_ACTIONS.SET_APP_NAME, payload: app.appName });
    }
  }
  if (appList) dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: appList });
  if (store) {
    dispatch({ type: APP_ACTIONS.SET_STORE, payload: store });
    dispatch({ type: APP_ACTIONS.SET_STORE_INVENTORY, payload: store.inventory });
  }
  if (page) dispatch({ type: APP_ACTIONS.SET_PAGE, payload: page });
  if (platformTiers) dispatch({ type: APP_ACTIONS.SET_PLATFORM_TIERS, payload: platformTiers });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
