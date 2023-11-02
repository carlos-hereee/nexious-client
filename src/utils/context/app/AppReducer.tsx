import { AppStateProps } from "app-context";
import { APP_ACTIONS } from "@app/utils/types/AppActions";

type ReducerAction = { type: APP_ACTIONS; payload?: any };
type AppReducerProps = (state: AppStateProps, action: ReducerAction) => AppStateProps;

export const reducer: AppReducerProps = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case APP_ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    case APP_ACTIONS.SET_THEME_LIST:
      return { ...state, themeList: action.payload };
    case APP_ACTIONS.SET_ADMIN_IDS:
      return { ...state, adminIds: action.payload };
    case APP_ACTIONS.SET_NEWSLETTER:
      return { ...state, newsletter: action.payload };
    case APP_ACTIONS.SET_APP_LIST:
      return { ...state, apps: action.payload };
    case APP_ACTIONS.SET_APP_ID:
      return { ...state, appId: action.payload };
    case APP_ACTIONS.SET_MEDIA:
      return { ...state, media: action.payload };
    case APP_ACTIONS.SET_OWNER_ID:
      return { ...state, ownerId: action.payload };
    case APP_ACTIONS.SET_APP_NAME:
      return { ...state, appName: action.payload };
    case APP_ACTIONS.SET_LANDING:
      return { ...state, landing: action.payload };
    case APP_ACTIONS.SET_CALENDAR:
      return { ...state, calendar: action.payload };
    case APP_ACTIONS.SET_APP_LOGO:
      return { ...state, logo: action.payload };
    case APP_ACTIONS.SET_MENU:
      return { ...state, menu: action.payload };
    // case APP_ACTIONS.SET_EDIT_APP:
    //   return { ...state, editApp: action.payload };
    // case APP_ACTIONS.COMING_SOON:
    //   return { ...state, isComingSoon: action.payload };
    // case APP_ACTIONS.UPDATE_PAGES:
    //   return { ...state, pages: action.payload };
    // case APP_ACTIONS.SET_UPLOAD_FILE_ERROR:
    //   return { ...state, uploadFileError: action.payload };
    // case APP_ACTIONS.UPDATE_BURGER:
    //   return { ...state, burger: action.payload };
    // case APP_ACTIONS.UPDATE_LANGUAGE:
    //   return { ...state, language: action.payload };
    // case APP_ACTIONS.LOAD_FILTERS:
    //   return { ...state, filters: action.payload, isFiltered: false };
    // case APP_ACTIONS.SELECT_PAYMENT_TYPE:
    //   return { ...state, paymentType: action.payload };
    // case APP_ACTIONS.UPDATE_SELECTED:
    //   return { ...state, selected: action.payload };
    // case APP_ACTIONS.UPDATE_APPLIED_FILTER:
    //   return { ...state, isFiltered: true, appliedFilters: action.payload };
    // case APP_ACTIONS.UPDATE_FILTER:
    //   return { ...state, isFiltered: true, filtered: action.payload };
    // case APP_ACTIONS.RESET_FILTER:
    //   return { ...state, isFiltered: false, filtered: action.payload };
    default:
      return state;
  }
};
