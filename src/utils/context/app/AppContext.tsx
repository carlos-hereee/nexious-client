import { ReactElement, createContext, useCallback, useContext, useMemo, useReducer } from "react";
import appState from "@data/appState.json";
import { ActiveMenuProp, ChildProps, ContactApp, MediaItemProp, NProps, PageProps, SubcriptionProp } from "app-types";
import { AppSchema } from "app-context";
import { AppAssets } from "app-admin";
import { APP_ACTIONS } from "@actions/AppActions";
import { setAppData } from "./dispatch/setAppData";
import { AuthContext } from "../auth/AuthContext";
import { reducer } from "./AppReducer";
import { fetchAppWithName } from "./request/fetchAppWithName";
import { setActiveData } from "./dispatch/setActiveData";
import { setIsLoading } from "./dispatch/setIsLoading";
import { getInventory } from "./request/getInventory";
import { fetchPage } from "./request/fetchPage";
import { upgradeLatest } from "./request/upgradeLatest";
import { stripeAccountLink } from "./request/stripeAccountLink";
import { removeNotification } from "./request/removeNotification";
import { addSubscription } from "./request/addSubscription";
import { editSubscription } from "./request/editSubscription";
import { removeSub } from "./request/removeSubscription";
import { fetchAppUsers, fetchPlatformData } from "./request/fetchPlatformData";
import { createStripeAccount } from "./request/createStripeAccount";
import { sendMessage } from "./request/sendMessage";

export const AppContext = createContext<AppSchema>({} as AppSchema);

export const AppState = ({ children }: ChildProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, appState);
  const { accessToken, updateUser } = useContext(AuthContext);

  const setAppLoading = useCallback((isLoading: boolean) => setIsLoading({ dispatch, isLoading }), []);
  // update app data
  const updateAppData = useCallback((data: AppAssets) => setAppData({ dispatch, ...data }), []);

  const updateActiveAppData = useCallback((data: ActiveMenuProp) => setActiveData({ dispatch, ...data }), []);
  // view store inventory
  const getStoreInventory = useCallback((storeId: string) => getInventory({ dispatch, storeId, updateAppData }), []);
  // create stripe account
  const signUpWithStripe = useCallback((appId: string) => createStripeAccount({ dispatch, appId }), []);

  const getPageWithId = useCallback((pageId: string) => fetchPage({ dispatch, pageId, updateAppData }), []);
  const getStripeAccountLink = useCallback((appId: string) => stripeAccountLink({ dispatch, appId }), []);
  // fetch app with app name
  const getAppWithName = useCallback((a: string) => fetchAppWithName({ dispatch, appName: a, updateAppData }), []);

  const getPlatformData = useCallback(() => fetchPlatformData({ dispatch }), []);
  const getAppUsers = useCallback((appId: string) => fetchAppUsers({ dispatch, appId }), []);
  const setActivePage = useCallback((data: PageProps) => dispatch({ payload: data, type: APP_ACTIONS.SET_ACTIVE_PAGE }), []);
  // ask user to upgrade app if they havent been online in a while
  const upgradeToLatest = useCallback((appId: string) => upgradeLatest({ dispatch, updateAppData, appId }), []);
  const setAppMessage = useCallback((M: string) => dispatch({ payload: M, type: APP_ACTIONS.SET_APP_MESSAGE }), []);
  const clearNotification = useCallback((data: NProps) => removeNotification({ dispatch, updateAppData, ...data }), []);
  const contactApp = useCallback((data: ContactApp) => sendMessage({ dispatch, updateAppData, ...data }), []);
  const setSocialMedia = useCallback((d: MediaItemProp) => dispatch({ payload: d, type: APP_ACTIONS.SET_MEDIA_ITEM }), []);
  // create and manage subscriptions
  const createSubscription = useCallback((data: SubcriptionProp) => addSubscription({ dispatch, ...data, updateUser }), []);
  const updateSubscription = useCallback((data: SubcriptionProp) => editSubscription({ dispatch, ...data, updateUser }), []);
  const deleteSubscription = useCallback((data: SubcriptionProp) => removeSub({ dispatch, ...data, updateUser }), []);

  const appValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      loadingState: state.loadingState,
      appMessage: state.appMessage,
      appUsers: state.appUsers,
      appList: state.appList,
      iconList: state.iconList,
      appName: state.appName,
      appUrl: state.appUrl,
      appLink: state.appLink,
      appId: state.appId,
      activeAppId: state.activeAppId,
      notifications: state.notifications,
      landing: state.landing,
      themeList: state.themeList,
      languageList: state.languageList,
      adminIds: state.adminIds,
      calendar: state.calendar,
      isOnline: state.isOnline,
      activeAppName: state.activeAppName,
      dbVersion: state.dbVersion,
      media: state.media,
      activeMedia: state.activeMedia,
      menu: state.menu,
      activeMenu: state.activeMenu,
      owner: state.owner,
      appError: state.appError,
      logo: state.logo,
      email: state.email,
      messages: state.messages,
      redirectUrl: state.redirectUrl,
      activeLogo: state.activeLogo,
      store: state.store,
      inventory: state.inventory,
      locale: state.locale,
      welcomeMessage: state.welcomeMessage,
      newsletter: state.newsletter,
      pages: state.pages,
      page: state.page,
      activePage: state.activePage,
      socialMedia: state.socialMedia,
      platformTiers: state.platformTiers,
      subscriptionTiers: state.subscriptionTiers,
      updateAppData,
      getAppWithName,
      getPlatformData,
      updateActiveAppData,
      setAppLoading,
      getStoreInventory,
      setActivePage,
      setSocialMedia,
      getStripeAccountLink,
      getPageWithId,
      createSubscription,
      deleteSubscription,
      updateSubscription,
      upgradeToLatest,
      clearNotification,
      getAppUsers,
      setAppMessage,
      signUpWithStripe,
      contactApp,
    };
  }, [
    state.isLoading,
    state.activeAppName,
    state.activePage,
    state.activeLogo,
    state.activeAppId,
    accessToken,
    state.activeMenu,
    state.appUsers,
    state.appName,
    state.appUrl,
    state.menu,
    state.appId,
    state.landing,
    state.inventory,
    state.socialMedia,
    state.loadingState,
    state.appMessage,
    state.redirectUrl,
    state.store,
    state.page,
    state.appList,
    state.subscriptionTiers,
    state.platformTiers,
  ]);

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
