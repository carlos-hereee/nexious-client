import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AdminSchema, AppAssetProps } from "app-admin";
import adminState from "@data/adminState.json";
import { ChildProps } from "app-types";
import { PreviewValueProps } from "app-forms";
import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { useNavigate } from "react-router-dom";
// import { nexiousMenu, nexiousName, nexiousLogo } from "@data/nexious.json";
import { reducer } from "./AdminReducer";
import { AppContext } from "../app/AppContext";
import { AuthContext } from "../auth/AuthContext";
// import { editApp } from "./requests/editApp";
// import { editAppName } from "./requests/editAppName";
// import { editLandingPage } from "./requests/editLandingPage";
// import { deleteApp } from "./requests/deleteApp";
// import { updateLanguage } from "./requests/updateLanguage";
// import { editNewsletter } from "./requests/editNewsletter";
// import { editSocialMedia } from "./requests/editSocialMedia";
// import { editCalendar } from "./requests/editCalendar";
// import { editLanguage } from "./requests/editLanguage";
// import { fetchRefreshToken } from "../auth/helpers/fetchRefreshToken";
import { fetchAccessToken } from "./requests/fetchAccessToken";
import { buildApp } from "./requests/buildApp";
import { updateAppName } from "./requests/updateAppName";
import { updateLandingPage } from "./requests/updateLandingPage";
import { updateNewsletter } from "./requests/updateNewsletter";
import { updateSocialMedia } from "./requests/updateSocialMedia";
import { removeApp } from "./requests/removeApp";

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);

  const {
    updateAppData,
    updateAppList,
    appName,
    //  getAppWithName, menu, logo, updateActiveMenu
  } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  // const queryParams = useLocation();

  // useEffect(() => {
  //   if (queryParams.pathname) {
  //     // console.log('queryParams.pathName :>> ', queryParams.pathName);
  //     if (queryParams.pathname === "/app") {
  //       const name = queryParams.search.split("appName=")[1];
  //       if (name.split("+").join(" ") === appName) {
  //         updateActiveMenu({ menu, appName, logo });
  //       } else if (name) getAppWithName(name);
  //     } else updateActiveMenu({ menu: nexiousMenu, appName: nexiousName, logo: nexiousLogo });
  //   } else updateActiveMenu({ menu: nexiousMenu, appName: nexiousName, logo: nexiousLogo });
  // }, [queryParams.pathname, queryParams, queryParams.search]);

  const handleAppAssets = (values: AppAssetProps) => {
    if (values.app) updateAppData(values.app);
    if (values.appList) updateAppList(values.appList);
    if (values.user) updateUser(values.user);
    dispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
  };

  /**
   *         updateLanguage: (a, b) =>
          updateLanguage({ dispatch, locale: a, appName: b, handleAppAssets }),
        editApp: (values, appId) => editApp({ dispatch, values, appId, handleAppAssets }),

        editCalendar: (a, b) => editCalendar({ dispatch, values: a, appId: b, handleAppAssets }),
        editLanguage: (a, b) => editLanguage({ dispatch, values: a, appId: b, handleAppAssets }),
   */

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
    navigate("/dashboard");
  }, []);

  const editAppName = useCallback((values: PreviewValueProps, appId: string) => {
    updateAppName({ dispatch, values, handleAppAssets, appId });
    navigate("/dashboard");
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editLandingPage = useCallback((values: any, appId: string) => {
    updateLandingPage({ dispatch, values, handleAppAssets, appId });
    navigate("/dashboard");
  }, []);

  const editNewsletter = useCallback((values: PreviewValueProps, appId: string) => {
    updateNewsletter({ dispatch, values, handleAppAssets, appId });
    navigate("/dashboard");
  }, []);

  const editSocialMedia = useCallback((values: PreviewValueProps, appId: string) => {
    updateSocialMedia({ dispatch, values, handleAppAssets, appId });
    navigate("/dashboard");
  }, []);

  const deleteApp = useCallback((appId: string) => {
    removeApp({ dispatch, appId, handleAppAssets });
    navigate("/dashboard");
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
    };
  }, [state.isLoading]);
  return <AdminContext.Provider value={adminValues}>{children}</AdminContext.Provider>;
};
