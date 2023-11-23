import { createContext, useContext, useEffect, useReducer } from "react";
import { AdminSchema, AppAssetProps } from "app-admin";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import adminState from "@data/adminState.json";
import { ChildProps } from "app-types";
import { reducer } from "./AdminReducer";
import { initApp } from "./requests/initApp";
import { editApp } from "./requests/editApp";
import { editAppName } from "./requests/editAppName";
import { editLandingPage } from "./requests/editLandingPage";
import { AppContext } from "../app/AppContext";
import { deleteApp } from "./requests/deleteApp";
import { AuthContext } from "../auth/AuthContext";
import { updateLanguage } from "./requests/updateLanguage";
import { editNewsletter } from "./requests/editNewsletter";
import { editSocialMedia } from "./requests/editSocialMedia";
import { editCalendar } from "./requests/editCalendar";
import { editLanguage } from "./requests/editLanguage";
import { fetchAccessToken } from "./requests/fetchAccessToken";

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);

  const { updateAppData, updateAppList } = useContext(AppContext);
  const { updateUser, accessToken, getAccessTokenData } = useContext(AuthContext);

  const handleAppAssets = (values: AppAssetProps) => {
    if (values.app) updateAppData(values.app);
    if (values.appList) updateAppList(values.appList);
    if (values.user) updateUser(values.user);
    // values.appList && updateAppList(values.appList);
    // values.user && updateUser(values.user);
  };

  const getAccessToken = () => {
    console.log("fetching token data");
    fetchAccessToken({ handleAppAssets });
    // dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  };

  useEffect(() => {
    if (accessToken) getAccessTokenData();
    else getAccessToken();
  }, [accessToken]);

  return (
    <AdminContext.Provider
      value={{
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
        appLogo: state.appLogo,
        // appMenu: state.appMenu,
        appName: state.appName,
        updateAppMenu: (e) => dispatch({ type: ADMIN_ACTIONS.SET_APP_MENU, payload: e }),
        updateLanguage: (a, b) =>
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
