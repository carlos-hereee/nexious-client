import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./AdminReducer";
import { AdminSchema } from "app-admin";
import { ChildProps } from "app-types";
import { initApp } from "./requests/initApp";
import { editApp } from "./requests/editApp";
import adminState from "@data/adminState.json";
import { editAppName } from "./requests/editAppName";
import { editLandingPage } from "./requests/editLandingPage";
import { AppContext } from "../app/AppContext";
import { deleteApp } from "./requests/deleteApp";
import { AuthContext } from "../auth/AuthContext";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { updateLanguage } from "./requests/updateLanguage";
import { editNewsletter } from "./requests/editNewsletter";
import { editSocialMedia } from "./requests/editSocialMedia";
import { editCalendar } from "./requests/editCalendar";
import { editLanguage } from "./requests/editLanguage";

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);
  const { updateAppData, updateAppList } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);

  useEffect(() => {
    // user is login
    let oldValues = [...state.appMenu];
    const authMenuItem = oldValues.filter((app) => app.isPrivate)[0];
    if (accessToken) {
      // find auth menu
      const authMenuItemIdx = oldValues.findIndex((app) => app.isPrivate);
      // find dashboard menu item
      const dashboard = authMenuItem.alternatives.filter((alt) => alt.name === "dashboard")[0];
      oldValues[authMenuItemIdx].active = dashboard;
      dispatch({ type: ADMIN_ACTIONS.SET_APP_MENU, payload: oldValues });
    } else {
    }
  }, [accessToken]);

  const handleAppAssets = (values: any) => {
    values.app && updateAppData(values.app);
    values.appList && updateAppList(values.appList);
    values.user && updateUser(values.user);
  };

  return (
    <AdminContext.Provider
      value={{
        isLoading: state.isLoading,
        initAppForm: state.initAppForm,
        pagesForm: state.pagesForm,
        calendarForm: state.calendarForm,
        sectionForm: state.sectionForm,
        newsletterForm: state.newsletterForm,
        landingForm: state.landingForm,
        heroForm: state.heroForm,
        ctaForm: state.ctaForm,
        socialMediaForm: state.socialMediaForm,
        sectionEntryOrganizer: state.sectionEntryOrganizer,
        formErrors: state.formErrors,
        languageForm: state.languageForm,
        themeList: state.themeList,
        languageList: state.languageList,
        appLogo: state.appLogo,
        appMenu: state.appMenu,
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
        editCalendar: (a, b) =>
          editCalendar({ dispatch, values: a, appId: b, handleAppAssets }),
        editLanguage: (a, b) =>
          editLanguage({ dispatch, values: a, appId: b, handleAppAssets }),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
