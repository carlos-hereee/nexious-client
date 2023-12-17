import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AdminSchema, AppAssetProps, FORM_STATUS } from "app-admin";
import adminState from "@data/adminState.json";
import { ChildProps } from "app-types";
import { PreviewValueProps } from "app-forms";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { LogContext } from "@context/log/LogContext";
import { reducer } from "./AdminReducer";
import { AppContext } from "../app/AppContext";
import { AuthContext } from "../auth/AuthContext";
import { fetchAccessToken } from "./requests/fetchAccessToken";
import { buildApp } from "./requests/buildApp";
import { updateAppName } from "./requests/updateAppName";
import { updateLandingPage } from "./requests/updateLandingPage";
import { updateNewsletter } from "./requests/updateNewsletter";
import { updateSocialMedia } from "./requests/updateSocialMedia";
import { removeApp } from "./requests/removeApp";
import { updateCalendar } from "./requests/updateCalendar";
import { getBucket } from "./requests/getBucket";
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
import { updateAppDetails } from "./requests/updateAppDetails";

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...adminState, formStatus: "IDLE" });

  const { updateAppData, setLoading } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);
  const { status } = useContext(LogContext);

  const setFormStatus = useCallback((data: FORM_STATUS) => {
    updateFormStatus({ dispatch, status: data });
  }, []);

  const handleAppAssets = (values: AppAssetProps) => {
    if (values.app || values.appList) updateAppData({ app: values.app, appList: values.appList });
    if (values.user) updateUser(values.user);
    if (values) setFormStatus("SUCCESS");
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  };

  useEffect(() => {
    if (accessToken) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      fetchAccessToken({ dispatch, handleAppAssets });
    } else if (status === "IDLE" && !accessToken) {
      setLoading(false);
    }
  }, [accessToken, status]);

  const initApp = useCallback((values: PreviewValueProps) => {
    buildApp({ dispatch, values, handleAppAssets });
  }, []);

  const editAppName = useCallback((values: PreviewValueProps, appId: string) => {
    updateAppName({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editLandingPage = useCallback((values: PreviewValueProps, appId: string) => {
    updateLandingPage({ dispatch, values, handleAppAssets, appId });
  }, []);
  const editAppDetails = useCallback((values: PreviewValueProps, appId: string) => {
    updateAppDetails({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editNewsletter = useCallback((values: PreviewValueProps, appId: string) => {
    updateNewsletter({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editSocialMedia = useCallback((values: PreviewValueProps, appId: string) => {
    updateSocialMedia({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editCalendar = useCallback((a: PreviewValueProps, appId: string) => {
    updateCalendar({ dispatch, values: a, appId, handleAppAssets });
  }, []);

  const editPage = useCallback((a: PreviewValueProps, appId: string, pageId?: string) => {
    updatePage({ dispatch, values: a, appId, handleAppAssets, pageId });
  }, []);

  const deleteApp = useCallback((appId: string) => {
    removeApp({ dispatch, appId, handleAppAssets });
  }, []);

  const deletePage = useCallback((appId: string, pageId: string) => {
    removePage({ dispatch, appId, handleAppAssets, pageId });
  }, []);

  const listBucket = useCallback((appId: string) => {
    getBucket({ dispatch, appId, handleAppAssets });
  }, []);

  const addPage = useCallback((values: PreviewValueProps, appId: string) => {
    createPage({ dispatch, appId, handleAppAssets, values });
  }, []);

  const addMedia = useCallback((values: PreviewValueProps, appId: string) => {
    createMedia({ dispatch, appId, handleAppAssets, values });
  }, []);
  const addStore = useCallback((values: PreviewValueProps, appId: string) => {
    buildStore({ dispatch, appId, handleAppAssets, values });
  }, []);
  const editStore = useCallback((values: PreviewValueProps, appId: string) => {
    updateStore({ dispatch, appId, handleAppAssets, values, setFormStatus });
  }, []);
  const addMerch = useCallback((values: PreviewValueProps, appId: string) => {
    addMerchendise({ dispatch, appId, handleAppAssets, values });
  }, []);
  const editMerch = useCallback((values: PreviewValueProps, appId: string, merchId: string) => {
    updateMerch({ dispatch, appId, handleAppAssets, values, merchId });
  }, []);

  const deleteMedia = useCallback((appId: string, name: string) => {
    removeMedia({ dispatch, appId, handleAppAssets, name });
  }, []);

  const adminValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      formStatus: state.formStatus,
      initAppForm: state.initAppForm,
      appDetailsForm: state.appDetailsForm,
      pagesForm: state.pagesForm,
      calendarForm: state.calendarForm,
      mediaList: state.mediaList,
      sectionForm: state.sectionForm,
      newsletterForm: state.newsletterForm,
      calendarThemeList: state.calendarThemeList,
      landingForm: state.landingForm,
      heroForm: state.heroForm,
      ctaForm: state.ctaForm,
      storeForm: state.storeForm,
      socialMediaForm: state.socialMediaForm,
      sectionEntries: state.sectionEntries,
      formErrors: state.formErrors,
      mediaEntryForm: state.mediaEntryForm,
      themeList: state.themeList,
      merchForm: state.merchForm,
      languageList: state.languageList,
      iconList: state.iconList,
      initApp,
      editAppName,
      editLandingPage,
      editNewsletter,
      editSocialMedia,
      deleteApp,
      deletePage,
      deleteMedia,
      editCalendar,
      listBucket,
      addPage,
      editPage,
      addMedia,
      addStore,
      editStore,
      addMerch,
      editMerch,
      editAppDetails,
      setFormStatus,
    };
  }, [state.isLoading, state.formStatus]);
  return <AdminContext.Provider value={adminValues}>{children}</AdminContext.Provider>;
};
