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
import { ChildProps } from "app-types";
import { ActiveMenuProps, AppListProps, AppProps, AppSchema } from "app-context";
import { APP_ACTIONS } from "@app/utils/actions/AppActions";
import { setAppData } from "./dispatch/setAppData";
import { AuthContext } from "../auth/AuthContext";
import { reducer } from "./AppReducer";
import { fetchAppWithName } from "./fetch/fetchAppWithName";
// import { setMenu } from "./dispatch/setMenu";
import { fetchAppList } from "./fetch/fetchAppList";
import { setActiveMenu } from "./dispatch/setActiveMenu";
// import { useLocation } from "react-router-dom";

export const AppContext = createContext<AppSchema>({} as AppSchema);

export const AppState = ({ children }: ChildProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, appState);
  const { accessToken } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const queryParams = useLocation();

  // useEffect(() => {
  //   getAppList({ dispatch });
  // }, []);
  useEffect(() => {
    // user is login
    const oldValues = [...state.activeMenu];
    const authMenuItem = oldValues.filter((app) => app.isPrivate)[0];
    if (accessToken) {
      // find auth menu
      const authMenuItemIdx = oldValues.findIndex((app) => app.isPrivate);
      // find dashboard menu item
      const logout = authMenuItem.alternatives.filter((alt) => alt.name === "logout")[0];
      oldValues[authMenuItemIdx].active = logout;
      dispatch({ type: APP_ACTIONS.SET_ACTIVE_MENU, payload: oldValues });
    }
  }, [accessToken]);

  // update app data
  const updateAppData = useCallback((a: AppProps) => setAppData({ dispatch, values: a }), []);
  // update app list
  const updateAppList = useCallback((a: AppListProps[]) => {
    dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: a });
  }, []);
  // fetch app with app name
  const getAppWithName = useCallback((a: string) => {
    fetchAppWithName({ dispatch, appName: a, updateAppData });
  }, []);
  const updateActiveMenu = useCallback((props: ActiveMenuProps) => {
    const { menu, appName, logo } = props;
    // console.log("props :>> ", props);
    setActiveMenu({ dispatch, menu, appName, logo });
  }, []);

  const getAppList = useCallback(() => fetchAppList({ dispatch }), []);
  // useEffect(() => {
  //   if (queryParams.search) {
  //     const appName = queryParams.search.split("appName=")[1];
  //     if (appName) {
  //       getAppWithName({
  //         dispatch,
  //         appName,
  //         updateApp: updateAppData,
  //       });
  //     }
  //   }
  // }, [queryParams.search]);
  const appValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      appList: state.appList,
      iconList: state.iconList,
      appName: state.appName,
      appId: state.appId,
      landing: state.landing,
      themeList: state.themeList,
      languageList: state.languageList,
      adminIds: state.adminIds,
      calendar: state.calendar,
      isOnline: state.isOnline,
      activeAppName: state.activeAppName,
      media: state.media,
      footerMedia: state.footerMedia,
      menu: state.menu,
      activeMenu: state.activeMenu,
      owner: state.owner,
      logo: state.logo,
      activeLogo: state.activeLogo,
      locale: state.locale,
      welcomeMessage: state.welcomeMessage,
      newsletter: state.newsletter,
      updateAppData,
      updateAppList,
      getAppWithName,
      getAppList,
      updateActiveMenu,
    };
  }, [state.isLoading]);

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
