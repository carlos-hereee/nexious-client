import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AdminSchema, AppAssetProps } from "app-admin";
import adminState from "@data/adminState.json";
import { ChildProps } from "app-types";
import { PreviewValueProps } from "app-forms";
import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { reducer } from "./AdminReducer";
import { AppContext } from "../app/AppContext";
import { AuthContext } from "../auth/AuthContext";
// import { updateLanguage } from "./requests/updateLanguage";
// import { editLanguage } from "./requests/editLanguage";
// import { fetchRefreshToken } from "../auth/helpers/fetchRefreshToken";
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

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);

  const { updateAppData, updateAppList, appName } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);

  const handleAppAssets = (values: AppAssetProps) => {
    if (values.app) updateAppData(values.app);
    if (values.appList) updateAppList(values.appList);
    if (values.user) updateUser(values.user);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  };

  useEffect(() => {
    if (accessToken) {
      dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: true });
      fetchAccessToken({ dispatch, handleAppAssets });
    }
  }, [accessToken]);

  useEffect(() => {
    if (appName) document.title = appName;
  }, [appName]);

  const initApp = useCallback((values: PreviewValueProps) => {
    buildApp({ dispatch, values, handleAppAssets });
  }, []);

  const editAppName = useCallback((values: PreviewValueProps, appId: string) => {
    updateAppName({ dispatch, values, handleAppAssets, appId });
  }, []);

  const editLandingPage = useCallback((values: PreviewValueProps, appId: string) => {
    updateLandingPage({ dispatch, values, handleAppAssets, appId });
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
    createMedia({ dispatch, appId, handleAppAssets, values });
  }, []);

  const deleteMedia = useCallback((appId: string, name: string) => {
    removeMedia({ dispatch, appId, handleAppAssets, name });
  }, []);

  const adminValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      initAppForm: state.initAppForm,
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
      languageForm: state.languageForm,
      themeList: state.themeList,
      languageList: state.languageList,
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
    };
  }, [state.isLoading]);
  return <AdminContext.Provider value={adminValues}>{children}</AdminContext.Provider>;
};
