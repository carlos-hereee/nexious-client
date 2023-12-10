import {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import appState from "@data/appState.json";
import { ChildProps, MenuProps } from "app-types";
import { ActiveMenuProps, AppListProps, AppProps, AppSchema } from "app-context";
import { APP_ACTIONS } from "@actions/AppActions";
import { useNavigate } from "react-router-dom";
import { toggleAuthMenuItem } from "@app/toggleMenu";
import { formatStringToUrl } from "@app/formatStringToUrl";
import { nexiousName } from "@data/nexious.json";
import { setAppData } from "./dispatch/setAppData";
import { AuthContext } from "../auth/AuthContext";
import { reducer } from "./AppReducer";
import { fetchAppWithName } from "./fetch/fetchAppWithName";
import { fetchAppList } from "./fetch/fetchAppList";
import { setActiveData } from "./dispatch/setActiveData";

export const AppContext = createContext<AppSchema>({} as AppSchema);

export const AppState = ({ children }: ChildProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, appState);
  const { accessToken, setTheme, logout, subscriptions, subscribe, unSubscribe } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // user is login
    const oldValues = [...state.activeMenu];
    // find auth menu
    const authIdx = oldValues.findIndex((app) => app.isPrivate);
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    // is user logged in
    if (accessToken) {
      // check if is origin app
      if (state.activeAppName !== nexiousName) {
        // check user subscriptions
        const subIdx = subscriptions.findIndex((sub) => sub.appName === state.activeAppName);
        // if user is a sub
        if (subIdx >= 0) oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "unsubscribe");
        else oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "subscribe");
        // otherwise user can logout
      } else oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "logout");
      // user logging out
    } else if (oldValues[authIdx].name === "logout") {
      oldValues[authIdx] = toggleAuthMenuItem(oldValues[authIdx], "login");
    }
    dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: oldValues });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }, [accessToken, state.activeAppName]);

  // update app data
  const updateAppData = useCallback((a: AppProps) => setAppData({ dispatch, values: a }), []);
  // update app list
  const updateAppList = useCallback((a: AppListProps[]) => {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: a });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }, []);
  // fetch app with app name
  const getAppWithName = useCallback((a: string) => {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    fetchAppWithName({ dispatch, appName: a, updateAppData });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }, []);
  const updateActiveAppData = useCallback((props: ActiveMenuProps) => {
    const { menu, appName, logo, media, appId } = props;
    setActiveData({ dispatch, menu, appName, logo, media, appId });
  }, []);

  const handleMenu = useCallback((menuItem: MenuProps, appName: string, appId: string) => {
    const oldValues = [...state.activeMenu];
    const { isPrivate, category, name, link } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      if (name === "logout") logout();
      else if (name === "subscribe") subscribe(appId);
      else if (name === "unsubscribe") unSubscribe(appId);
      else navigate(`/${link}` || "");
      // change theme
    } else if (category === "theme") setTheme(menuItem.value);
    // otherwise go to page
    else if (menuItem.isPage) navigate(`/app/${formatStringToUrl(appName)}${link}` || "");
    updateActiveAppData({ menu: oldValues });
  }, []);
  const getAppList = useCallback(() => fetchAppList({ dispatch }), []);

  const appValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      appList: state.appList,
      iconList: state.iconList,
      appName: state.appName,
      appId: state.appId,
      activeAppId: state.activeAppId,
      landing: state.landing,
      themeList: state.themeList,
      languageList: state.languageList,
      adminIds: state.adminIds,
      calendar: state.calendar,
      isOnline: state.isOnline,
      activeAppName: state.activeAppName,
      media: state.media,
      activeMedia: state.activeMedia,
      menu: state.menu,
      activeMenu: state.activeMenu,
      owner: state.owner,
      appError: state.appError,
      logo: state.logo,
      activeLogo: state.activeLogo,
      locale: state.locale,
      welcomeMessage: state.welcomeMessage,
      newsletter: state.newsletter,
      pages: state.pages,
      updateAppData,
      updateAppList,
      getAppWithName,
      getAppList,
      updateActiveAppData,
      handleMenu,
    };
  }, [state.isLoading, state.activeAppName, accessToken, state.appList, state.appName]);

  return <AppContext.Provider value={appValues}>{children}</AppContext.Provider>;
  // return (
  //   <AppContext.Provider
  //     value={{
  //       isLoading: state.isLoading,
  //       appList: state.appList,
  //       iconList: state.iconList,
  //       appName: state.appName,
  //       appId: state.appId,
  //       landing: state.landing,
  //       themeList: state.themeList,
  //       languageList: state.languageList,
  //       adminIds: state.adminIds,
  //       calendar: state.calendar,
  //       isOnline: state.isOnline,
  //       media: state.media,
  //       menu: state.menu,
  //       activeMenu: state.activeMenu,
  //       owner: state.owner,
  //       logo: state.logo,
  //       locale: state.locale,
  //       welcomeMessage: state.welcomeMessage,
  //       newsletter: state.newsletter,
  //       updateAppData: (a) => updateAppData({ dispatch, values: a }),
  //       updateAppList: (a) => dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: a }),
  //       getAppWithName: (appName) =>
  //         getAppWithName({
  //           dispatch,
  //           appName,
  //           updateApp: (e) => updateAppData({ dispatch, values: e }),
  //         }),
  //       // getAppList: () => getAppList({ dispatch }),
  //       updateMenu: (a) => updateMenu({ dispatch, data: a }),
  //     }}
  //   >
  //     {children}
  //   </AppContext.Provider>
  // );
};

// import { uploadImage } from "./helpers/uploadImage";
// import { getLatestAppData } from "./helpers/getLatestAppData";
// import { getFiles } from "./helpers/getFiles";
// import { toggleMenuItemLogin } from "../../app/toggleMenuItemLogin";
// import { isDev } from "@app/config";
// import { updateApp } from "./helpers/updateApp";
// import { updateMenu } from "./helpers/updateMenu";
// import { newsletter } from "./helpers/newsletter";
// import { selectPaymentType } from "./helpers/selectPaymentType";
// import { readyCheckout } from "./helpers/readyCheckout";
// import { seeDetails } from "./helpers/seeDetails";
// import { resetSelect } from "./helpers/resetSelect";
// import { updateFilter } from "./helpers/updateFilter";
// import { updateAppliedFilter } from "./helpers/updateAppliedFilter";
// import { resetFilter } from "./helpers/resetFilter";
// import { addPage } from "./helpers/addPage";
// import { uploadFile } from "./helpers/uploadFile";
// import { setTheme } from "./helpers/setTheme";
// import { getAppWithAppId } from "./helpers/getAppWithAppId";
// import { setEditApp } from "./helpers/setEditApp";
// language: state.language,
// menu: state.menu,
// permissions: state.permissions,

// isComingSoon: state.isComingSoon,
// app: state.app,
// pages: state.pages,
// logo: state.logo,
// editApp: state.editApp,
// landingPageValues: state.landingPageValues,
// landingPageLabels: state.landingPageLabels,
// landingPageTypes: state.landingPageTypes,
// sectionValues: state.sectionValues,
// sectionLabels: state.sectionLabels,
// sectionTypes: state.sectionTypes,
// pageValues: state.pageValues,
// pageValuesTypes: state.pageValuesTypes,
// pageLabels: state.pageLabels,
// pagePlaceholders: state.pagePlaceholders,
// appValues: state.appValues,
// appValuesTypes: state.appValuesTypes,
// appLabels: state.appLabels,
// appPlaceholders: state.appPlaceholders,
// calendar: state.calendar,
// uploadFileError: state.uploadFileError,
// media: state.media,
// about: state.about,
// services: state.services,
// menu: state.menu,
// schedule: state.schedule,
// burger: state.burger,
// gallery: state.gallery,
// faq: state.faq,
// checkout: state.checkout,
// contact: state.contact,
// footerNewsletter: state.footerNewsletter,
// landing: state.landing,
// testimonials: state.testimonials,
// paymentMethods: state.paymentMethods,
// selected: state.selected,
// paymentType: state.paymentType,
// disclaimer: state.disclaimer,
// filters: state.filters,
// filtered: state.filtered,
// appliedFilters: state.appliedFilters,
// isFiltered: state.isFiltered,
// filterToggle: state.filterToggle,
// updateBurger: (a) => updateBurger(dispatch, a),
// updateMenu: (a) => updateMenu(dispatch, a),
// newsletter: (a) => newsletter(dispatch, a),
// selectPaymentType: (a) => selectPaymentType(dispatch, a),
// readyCheckout: (a, b, c) => readyCheckout(dispatch, a, b, c),
// seeDetails: (a) => seeDetails(dispatch, a),
// resetSelect: () => resetSelect(dispatch),
// updateFilter: (a, b) => updateFilter(dispatch, a, b),
// updateAppliedFilter: (a, b) => updateAppliedFilter(dispatch, a, b),
// resetFilter: (a) => resetFilter(dispatch, a),
// uploadImage: (a, b) => uploadImage(dispatch, a, b),
// getFiles: (a) => getFiles(dispatch, a),
// uploadFile: (a) => uploadFile(dispatch, a),
// updateApp: (a) => updateApp(dispatch, a),
// deleteApp: (a) => deleteApp(dispatch, a),
// getAppWithAppId: (a) => getAppWithAppId(dispatch, a),
// setEditApp: (a) => setEditApp(dispatch, a),
// updateEditAppState: (a) => dispatch({ type: "SET_EDIT_APP", payload: a }),
// addPage: (a) => addPage(dispatch, a, appId, getLatestAppData),
