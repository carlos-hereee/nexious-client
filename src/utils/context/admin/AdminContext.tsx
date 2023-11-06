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

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);
  const { updateAppData, updateAppList } = useContext(AppContext);
  const { updateUser, accessToken } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     user.role === "admin"
  //       ? dispatch({ type: "IS_LOADING", payload: false })
  //       : navigate("/dashboard");
  //   }
  // }, [user]);
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
        sectionForm: state.sectionForm,
        newsletterForm: state.newsletterForm,
        landingPageForm: state.landingPageForm,
        heroForm: state.heroForm,
        ctaForm: state.ctaForm,
        socialMediaForm: state.socialMediaForm,
        sectionEntryOrganizer: state.sectionEntryOrganizer,
        formErrors: state.formErrors,
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
        editNewsletter: (values, appId) =>
          editNewsletter({ dispatch, values, appId, handleAppAssets }),
        editAppName: (values, appId) =>
          editAppName({ dispatch, values, appId, handleAppAssets }),
        editLandingPage: (values, appId) =>
          editLandingPage({ dispatch, values, appId, handleAppAssets }),
        editSocialMedia: (values, appId) =>
          editSocialMedia({ dispatch, values, appId, handleAppAssets }),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
