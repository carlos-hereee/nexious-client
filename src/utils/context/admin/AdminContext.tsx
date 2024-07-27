import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AdminSchema, AppAssets, EditPageValues, FORM_STATUS } from "app-admin";
import adminState from "@data/adminState.json";
import { ChildProps, StringObjProp } from "app-types";
import { AppValues, FormValueData } from "app-forms";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { StoreOrderUpdate } from "store-context";
import { MediaRequest } from "media-context";
import { MediaContext } from "@context/media/MediaContext";
import { reducer } from "./AdminReducer";
import { AppContext } from "../app/AppContext";
import { AuthContext } from "../auth/AuthContext";
import { fetchAccessToken } from "./requests/fetchAccessToken";
import { buildApp } from "./requests/app/buildApp";
import { updateAppName } from "./requests/updateAppName";
import { updateLandingPage } from "./requests/updateLandingPage";
import { updateNewsletter } from "./requests/updateNewsletter";
import { updateSocialMedia } from "./requests/updateSocialMedia";
import { removeApp } from "./requests/app/removeApp";
import { updateCalendar } from "./requests/calendar/updateCalendar";
// import { getBucket } from "./requests/getBucket";
import { createPage } from "./requests/createPage";
import { updatePage } from "./requests/updatePage";
import { removePage } from "./requests/removePage";
import { createMedia } from "./requests/createMedia";
import { removeMedia } from "./requests/removeMedia";
import { buildStore } from "./requests/store/buildStore";
import { addMerchendise } from "./requests/store/addMerchendise";
import { updateStore } from "./requests/store/updateStore";
import { updateFormStatus } from "./dispatch/updateFormStatus";
import { updateMerch } from "./requests/store/updateMerch";
import { updateAppDetails } from "./requests/app/updateAppDetails";
import { removeStore } from "./requests/store/removeStore";
import { removeMerch } from "./requests/store/removeMerch";
import { addCalendar } from "./requests/calendar/addCalendar";
import { removeMenuItem } from "./requests/app/removeMenuItem";
import { updateMenuItem } from "./requests/app/updateMenuItem";
import { updateOrder } from "./requests/store/updateOder";
import { fetchWebhooks } from "./requests/fetchWebhooks";

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...adminState, formStatus: "IDLE" });

  const { updateAppData, setAppLoading } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);
  const { updatePosts } = useContext(MediaContext);

  const setFormStatus = useCallback((data: FORM_STATUS) => updateFormStatus({ dispatch, status: data }), []);
  const handleAppAssets = (values: AppAssets) => {
    if (values.app || values.appList || values.platformTiers) updateAppData(values);
    if (values.user) updateUser(values.user);
    if (values.posts) updatePosts(values.posts);
    // if (values.account) updateStripeConfig(values.account);
    if (values) setFormStatus("SUCCESS");
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  };

  useEffect(() => {
    if (accessToken) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      fetchAccessToken({ dispatch, handleAppAssets });
    } else setAppLoading(false);
  }, [accessToken]);

  const initApp = useCallback((values: AppValues) => buildApp({ dispatch, values, handleAppAssets }), []);

  // app data
  const editAppName = useCallback((values: AppValues, appId: string) => {
    updateAppName({ dispatch, values, handleAppAssets, appId });
  }, []);

  // TODO: HANDLE REQEUST
  // app data menu item request
  const deleteMenuItem = useCallback((appId: string, uid: string) => {
    removeMenuItem({ dispatch, appId, uid, handleAppAssets });
  }, []);
  const editMenuItem = useCallback((appId: string, uid: string, values: StringObjProp) => {
    updateMenuItem({ dispatch, appId, uid, handleAppAssets, values });
  }, []);

  const editLandingPage = useCallback((values: AppValues, appId: string) => {
    updateLandingPage({ dispatch, values, handleAppAssets, appId });
  }, []);
  const editAppDetails = useCallback((values: AppValues, appId: string) => {
    updateAppDetails({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editNewsletter = useCallback((values: AppValues, appId: string) => {
    updateNewsletter({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editSocialMedia = useCallback((values: AppValues, appId: string) => {
    updateSocialMedia({ dispatch, values, handleAppAssets, appId });
  }, []);

  // calendar requests
  const editCalendar = useCallback((data: FormValueData) => updateCalendar({ dispatch, ...data, handleAppAssets }), []);
  const createCalendar = useCallback((data: FormValueData) => addCalendar({ dispatch, ...data, handleAppAssets }), []);

  const editPage = useCallback((data: EditPageValues) => updatePage({ dispatch, ...data, handleAppAssets }), []);

  const deleteApp = useCallback((appId: string) => removeApp({ dispatch, appId, handleAppAssets }), []);
  const deletePage = useCallback((data: EditPageValues) => removePage({ dispatch, handleAppAssets, ...data }), []);

  const deleteStore = useCallback((appId: string) => removeStore({ dispatch, appId, handleAppAssets }), []);
  const deleteMedia = useCallback((data: MediaRequest) => removeMedia({ dispatch, handleAppAssets, ...data }), []);
  const deleteMerchItem = useCallback((appId: string, merchId: string) => {
    removeMerch({ dispatch, appId, merchId, handleAppAssets });
  }, []);

  const addPage = useCallback((values: AppValues, appId: string) => {
    createPage({ dispatch, appId, handleAppAssets, values });
  }, []);

  const addMedia = useCallback((values: AppValues, appId: string) => {
    createMedia({ dispatch, appId, handleAppAssets, values });
  }, []);
  const addStore = useCallback((values: AppValues, appId: string) => {
    buildStore({ dispatch, appId, handleAppAssets, values });
  }, []);
  const editStore = useCallback((values: AppValues, appId: string) => {
    updateStore({ dispatch, appId, handleAppAssets, values });
  }, []);
  const addMerch = useCallback((values: AppValues, appId: string) => {
    addMerchendise({ dispatch, appId, handleAppAssets, values });
  }, []);
  const editMerch = useCallback((values: AppValues, appId: string, merchId: string) => {
    updateMerch({ dispatch, appId, handleAppAssets, values, merchId });
  }, []);

  const handleOrderClick = useCallback((data: StoreOrderUpdate) => updateOrder({ dispatch, ...data, handleAppAssets }), []);
  const getWebhooks = useCallback(() => fetchWebhooks({ dispatch }), []);
  const adminValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      formStatus: state.formStatus,
      initAppForm: state.initAppForm,
      appDetailsForm: state.appDetailsForm,
      appMenuForm: state.appMenuForm,
      pagesForm: state.pagesForm,
      calendarForm: state.calendarForm,
      mediaList: state.mediaList,
      sectionForm: state.sectionForm,
      newsletterForm: state.newsletterForm,
      calendarThemeList: state.calendarThemeList,
      calendarBookingForm: state.calendarBookingForm,
      landingForm: state.landingForm,
      heroForm: state.heroForm,
      ctaForm: state.ctaForm,
      subscriptionForm: state.subscriptionForm,
      socialMediaForm: state.socialMediaForm,
      sectionEntries: state.sectionEntries,
      formErrors: state.formErrors,
      mediaEntryForm: state.mediaEntryForm,
      themeList: state.themeList,
      stripeForm: state.stripeForm,
      merchForm: state.merchForm,
      languageList: state.languageList,
      iconList: state.iconList,
      webhooks: state.webhooks,
      initApp,
      editAppName,
      editLandingPage,
      editNewsletter,
      editSocialMedia,
      deleteApp,
      deletePage,
      deleteMedia,
      editCalendar,
      createCalendar,
      addPage,
      editPage,
      addMedia,
      addStore,
      editStore,
      addMerch,
      editMerch,
      editAppDetails,
      setFormStatus,
      deleteStore,
      deleteMerchItem,
      // updateAccount,
      deleteMenuItem,
      editMenuItem,
      handleOrderClick,
      getWebhooks,
    };
  }, [state.isLoading, state.formStatus, state.webhooks]);
  return <AdminContext.Provider value={adminValues}>{children}</AdminContext.Provider>;
};
