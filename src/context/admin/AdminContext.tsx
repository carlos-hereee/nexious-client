import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { AdminSchema, AppAssetProps } from "app-admin";
import adminState from "@data/adminState.json";
import { ChildProps } from "app-types";
import { FormValueProps } from "app-forms";
import { ADMIN_ACTIONS } from "@app/utils/actions/AdminActions";
import { reducer } from "./AdminReducer";
import { AppContext } from "../app/AppContext";
import { AuthContext } from "../auth/AuthContext";
// import { initApp } from "./requests/initApp";
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

  /**
   *         updateLanguage: (a, b) =>
          updateLanguage({ dispatch, locale: a, appName: b, handleAppAssets }),
        initApp: (values) => initApp({ dispatch, values, handleAppAssets }),
        deleteApp: (appId) => deleteApp({ dispatch, appId, handleAppAssets }),
        editApp: (values, appId) => editApp({ dispatch, values, appId, handleAppAssets }),
        editNewsletter: (a, b) =>
          editNewsletter({ dispatch, values: a, appId: b, handleAppAssets }),
        editAppName: (a, b) => editAppName({ dispatch, values: a, appId: b, handleAppAssets }),
        editLandingPage: (a, b) =>
          editLandingPage({ dispatch, values: a, appId: b, handleAppAssets }),
        editSocialMedia: (a, b) =>
          editSocialMedia({ dispatch, values: a, appId: b, handleAppAssets }),
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

  const initApp = useCallback((values: FormValueProps) => {
    buildApp({ dispatch, initApp: values, handleAppAssets });
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
    };
  }, [state.isLoading]);
  return <AdminContext.Provider value={adminValues}>{children}</AdminContext.Provider>;
};
