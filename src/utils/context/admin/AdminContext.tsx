import { createContext, useContext, useReducer } from "react";
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

export const AdminContext = createContext<AdminSchema>({} as AdminSchema);
export const AdminState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, adminState);
  const { updateAppData, updateAppList } = useContext(AppContext);
  const { updateUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     user.role === "admin"
  //       ? dispatch({ type: "IS_LOADING", payload: false })
  //       : navigate("/dashboard");
  //   }
  // }, [user]);
  return (
    <AdminContext.Provider
      value={{
        isLoading: state.isLoading,
        appNameForm: state.appNameForm,
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
        initApp: (values) => initApp({ dispatch, values, updateUser, updateAppData }),
        deleteApp: (appId) =>
          deleteApp({ dispatch, appId, updateUser, updateAppData, updateAppList }),
        editApp: (values, appId) => editApp({ dispatch, values, appId, updateAppData }),
        editAppName: (values, appId) =>
          editAppName({ dispatch, values, appId, updateAppData }),
        editLandingPage: (values, appId) =>
          editLandingPage({ dispatch, values, appId, updateAppData }),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
