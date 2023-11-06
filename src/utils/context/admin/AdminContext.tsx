import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./AdminReducer";
import { AdminSchema } from "app-admin";
import { ChildProps } from "app-types";
import { initApp } from "./helpers/initApp";
import { editApp } from "./helpers/editApp";
import adminState from "@data/adminState.json";
import { editAppName } from "./helpers/editAppName";
import { editLandingPage } from "./helpers/editLandingPage";
import { AppContext } from "../app/AppContext";
import { deleteApp } from "./helpers/deleteApp";
import { AuthContext } from "../auth/AuthContext";
import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
import { updateLanguage } from "./helpers/updateLanguage";

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
    values.appList && updateAppData(values.appList);
    values.user && updateUser(values.user);
  };

  return (
    <AdminContext.Provider
      value={{
        isLoading: state.isLoading,
        initAppForm: state.initAppForm,
        pagesForm: state.pagesForm,
        sectionForm: state.sectionForm,
        landingPageForm: state.landingPageForm,
        heroForm: state.heroForm,
        ctaForm: state.ctaForm,
        landingPageFormOrder: state.landingPageFormOrder,
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
        editAppName: (values, appId) =>
          editAppName({ dispatch, values, appId, handleAppAssets }),
        editLandingPage: (values, appId) =>
          editLandingPage({ dispatch, values, appId, handleAppAssets }),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
