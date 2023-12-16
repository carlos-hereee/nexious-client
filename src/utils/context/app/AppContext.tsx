import { ReactElement, createContext, useCallback, useContext, useMemo, useReducer } from "react";
import appState from "@data/appState.json";
import { ActiveMenuProps, ChildProps, MenuProps } from "app-types";
import { AppSchema } from "app-context";
import { useNavigate } from "react-router-dom";
import { AppAssetProps } from "app-admin";
import { readableUrlString } from "@app/formatStringUrl";
import { setAppData } from "./dispatch/setAppData";
import { AuthContext } from "../auth/AuthContext";
import { reducer } from "./AppReducer";
import { fetchAppWithName } from "./fetch/fetchAppWithName";
import { fetchAppList } from "./fetch/fetchAppList";
import { setActiveData } from "./dispatch/setActiveData";
import { setIsLoading } from "./dispatch/setIsLoading";

export const AppContext = createContext<AppSchema>({} as AppSchema);

export const AppState = ({ children }: ChildProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, appState);
  const { accessToken, setTheme, logout, subscribe, unSubscribe } = useContext(AuthContext);
  const navigate = useNavigate();

  // update app data
  const setLoading = useCallback((isLoading: boolean) => {
    setIsLoading({ dispatch, isLoading });
  }, []);
  // update app data
  const updateAppData = useCallback((props: AppAssetProps) => {
    const { app, appList } = props;
    setAppData({ dispatch, app, appList });
  }, []);

  const updateActiveAppData = useCallback((props: ActiveMenuProps) => {
    const { menu, appName, logo, media, appId } = props;
    setActiveData({ dispatch, menu, appName, logo, media, appId });
  }, []);

  // fetch app with app name
  const getAppWithName = useCallback(async (a: string, setAsActive?: boolean) => {
    const app = await fetchAppWithName({ dispatch, appName: a });
    if (app) {
      updateAppData({ app });
      if (setAsActive) updateActiveAppData(app);
    }
  }, []);
  // TODO: move menu handling to dispatch folder
  const handleMenu = useCallback((menuItem: MenuProps, appName: string, appId: string) => {
    const { isPrivate, category, name, link } = menuItem;
    // if menu item is private navigate to route to retrieve credentials
    if (isPrivate) {
      if (name === "logout") logout();
      else if (name === "subscribe") subscribe(appId);
      else if (name === "unsubscribe") unSubscribe(appId);
      else navigate(`/${link || ""}`);
      // change theme
    } else if (category === "theme") setTheme(menuItem.value);
    // otherwise go to page
    else if (menuItem.isPage) navigate(`/app/${readableUrlString(appName)}${link}` || "");
  }, []);
  const getAppList = useCallback(() => fetchAppList({ dispatch }), []);

  const appValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      appList: state.appList,
      iconList: state.iconList,
      appName: state.appName,
      appUrl: state.appUrl,
      appLink: state.appLink,
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
      store: state.store,
      activeLogo: state.activeLogo,
      locale: state.locale,
      welcomeMessage: state.welcomeMessage,
      newsletter: state.newsletter,
      pages: state.pages,
      updateAppData,
      getAppWithName,
      getAppList,
      updateActiveAppData,
      handleMenu,
      setLoading,
    };
  }, [state.isLoading, state.activeAppName, accessToken, state.activeMenu, state.appId]);

  return <AppContext.Provider value={appValues}>{children}</AppContext.Provider>;
};
/**
 * 
 
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
// addPage: (a) => addPage(dispatch, a, appId, getLatestAppData)

*/
