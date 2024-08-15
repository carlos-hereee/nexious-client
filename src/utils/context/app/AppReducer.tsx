import { APP_ACTIONS } from "@actions/AppActions";
import { AppActionProps, AppStateProps } from "app-context";

export const reducer = (state: AppStateProps, action: AppActionProps): AppStateProps => {
  switch (action.type) {
    case APP_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case APP_ACTIONS.SET_LOADING_STATE:
      return { ...state, loadingState: { ...state.loadingState, ...action.payload } };
    case APP_ACTIONS.SET_THEME_LIST:
      return { ...state, themeList: action.payload };
    case APP_ACTIONS.SET_PLATFORM_TIERS:
      return { ...state, platformTiers: action.payload };
    case APP_ACTIONS.SET_APP_MESSAGES:
      return { ...state, messages: action.payload };
    case APP_ACTIONS.SET_APP_MESSAGE:
      return { ...state, appMessage: action.payload };
    case APP_ACTIONS.SET_APP_USERS:
      return { ...state, appUsers: action.payload };
    case APP_ACTIONS.SET_APP_SUBSCRIPTIONS:
      return { ...state, subscriptionTiers: action.payload };
    case APP_ACTIONS.SET_ADMIN_IDS:
      return { ...state, adminIds: action.payload };
    case APP_ACTIONS.SET_MEDIA_ITEM:
      return { ...state, socialMedia: action.payload };
    case APP_ACTIONS.SET_REDIRECT_URL:
      return { ...state, redirectUrl: action.payload };
    case APP_ACTIONS.SET_ACTIVE_MENU:
      return { ...state, activeMenu: action.payload };
    case APP_ACTIONS.SET_ACTIVE_MEDIA:
      return { ...state, activeMedia: action.payload };
    case APP_ACTIONS.SET_STORE_INVENTORY:
      return { ...state, inventory: action.payload };
    case APP_ACTIONS.SET_NEWSLETTER:
      return { ...state, newsletter: action.payload };
    case APP_ACTIONS.SET_APP_LIST:
      return { ...state, appList: action.payload };
    case APP_ACTIONS.SET_APP_ID:
      return { ...state, appId: action.payload };
    case APP_ACTIONS.SET_ACTIVE_PAGE:
      return { ...state, activePage: action.payload };
    case APP_ACTIONS.SET_ACTIVE_APP_ID:
      return { ...state, activeAppId: action.payload };
    case APP_ACTIONS.SET_STORE:
      return { ...state, store: action.payload };
    case APP_ACTIONS.SET_MEDIA:
      return { ...state, media: action.payload };
    case APP_ACTIONS.SET_PAGES:
      return { ...state, pages: action.payload };
    case APP_ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case APP_ACTIONS.SET_OWNER:
      return { ...state, owner: action.payload };
    case APP_ACTIONS.SET_APP_NAME:
      return { ...state, appName: action.payload };
    case APP_ACTIONS.SET_DB_VERSION:
      return { ...state, dbVersion: action.payload };
    case APP_ACTIONS.SET_APP_URL:
      return { ...state, appUrl: action.payload };
    case APP_ACTIONS.SET_APP_LINK:
      return { ...state, appLink: action.payload };
    case APP_ACTIONS.SET_ACTIVE_APP_NAME:
      return { ...state, activeAppName: action.payload };
    case APP_ACTIONS.SET_APP_ERROR:
      return { ...state, appError: action.payload };
    case APP_ACTIONS.SET_LANDING:
      return { ...state, landing: action.payload };
    case APP_ACTIONS.SET_CALENDAR:
      return { ...state, calendar: action.payload };
    case APP_ACTIONS.SET_APP_LOGO:
      return { ...state, logo: action.payload };
    case APP_ACTIONS.SET_ACTIVE_LOGO:
      return { ...state, activeLogo: action.payload };
    case APP_ACTIONS.SET_APP_MAPS:
      return { ...state, maps: action.payload };
    case APP_ACTIONS.SET_MENU:
      return { ...state, menu: action.payload };
    case APP_ACTIONS.SET_LOCALE:
      return { ...state, locale: action.payload };
    case APP_ACTIONS.SET_LANGUAGES:
      return { ...state, languageList: action.payload };
    case APP_ACTIONS.SET_NOTIFICATIONS:
      return { ...state, notifications: action.payload };

    default:
      throw new Error();
  }
};
// Photo by <a href=""></a> on <a href="">Unsplash</a>
