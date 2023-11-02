import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./AppReducer";
import { AuthContext } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import appState from "@data/appState.json";
import { ChildProps } from "app-types";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { updateAppData } from "./helpers/updateAppData";
import { AppSchema } from "app-context";
import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { getAppList } from "./helpers/getAppList";
import { getAppWithName } from "./helpers/getWithAppName";
// import { uploadImage } from "./helpers/uploadImage";
// import { getLatestAppData } from "./helpers/getLatestAppData";
// import { getFiles } from "./helpers/getFiles";
// import { toggleMenuItemLogin } from "../../app/toggleMenuItemLogin";
// import { isDev } from "@app/config";
// import { updateApp } from "./helpers/updateApp";
// import { updateMenu } from "./helpers/updateMenu";
// import { newsletter } from "./helpers/newsletter";
// import { selectPaymentType } from "./helpers/selectPaymentType";
// import { readyCheckout } from "./helpers/readyCheckout";
// import { seeDetails } from "./helpers/seeDetails";
// import { resetSelect } from "./helpers/resetSelect";
// import { updateFilter } from "./helpers/updateFilter";
// import { updateAppliedFilter } from "./helpers/updateAppliedFilter";
// import { resetFilter } from "./helpers/resetFilter";
// import { addPage } from "./helpers/addPage";
// import { uploadFile } from "./helpers/uploadFile";
// import { setTheme } from "./helpers/setTheme";
// import { getAppWithAppId } from "./helpers/getAppWithAppId";
// import { setEditApp } from "./helpers/setEditApp";

export const AppContext = createContext<AppSchema>({} as AppSchema);

export const AppState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, appState);
  // const { accessToken, user } = useContext(AuthContext);
  // const navigate = useNavigate();
  // const queryParams = useLocation();

  // useEffect(() => {
  //   if (queryParams.search) {
  //     const appName = queryParams.search.split("appName=")[1];
  //     if (appName) {
  //       getAppWithName({
  //         dispatch,
  //         appName,
  //         updateApp: (values) => updateAppData({ dispatch, values }),
  //       });
  //     }
  //   }
  // }, [queryParams.search]);

  useEffect(() => {
    getAppList({ dispatch });
  }, []);
  // useEffect(() => {
  //   // user is login
  //   if (accessToken) {

  //     // navigate admin and regular users
  //     // if (user && user.role === "admin") navigate("/admin-dashboard");
  //     // if (user.role === "admin") navigate("/add-page");
  //     // else navigate("/dashboard");
  //     // if (state.menu) {
  //     //   const { altMenu, idx } = toggleMenuItemLogin(state.menu, accessToken);
  //     //   dispatch({ type: "SET_MENU", payload: altMenu });
  //     //   // altMenu[idx].active.link && navigate(`/${altMenu[idx].active.link}`);
  //     // }
  //   }
  // }, [accessToken]);

  return (
    <AppContext.Provider
      value={{
        isLoading: state.isLoading,
        apps: state.apps,
        appName: state.appName,
        appId: state.appId,
        landing: state.landing,
        theme: state.theme,
        themeList: state.themeList,
        adminIds: state.adminIds,
        calendar: state.calendar,
        media: state.media,
        menu: state.menu,
        ownerId: state.ownerId,
        logo: state.logo,
        welcomeMessage: state.welcomeMessage,
        newsletter: state.newsletter,
        updateAppData: (a) => updateAppData({ dispatch, values: a }),
        getAppWithName: (appName) =>
          getAppWithName({ appName, updateApp: (e) => updateAppData({ dispatch, values: e }) }),
        setTheme: (a) => dispatch({ type: APP_ACTIONS.SET_THEME, payload: a }),
        getAppList: () => getAppList({ dispatch }),

        // language: state.language,
        // menu: state.menu,
        // permissions: state.permissions,

        // isComingSoon: state.isComingSoon,
        // app: state.app,
        // pages: state.pages,
        // logo: state.logo,
        // editApp: state.editApp,
        // landingPageValues: state.landingPageValues,
        // landingPageLabels: state.landingPageLabels,
        // landingPageTypes: state.landingPageTypes,
        // sectionValues: state.sectionValues,
        // sectionLabels: state.sectionLabels,
        // sectionTypes: state.sectionTypes,
        // pageValues: state.pageValues,
        // pageValuesTypes: state.pageValuesTypes,
        // pageLabels: state.pageLabels,
        // pagePlaceholders: state.pagePlaceholders,
        // appValues: state.appValues,
        // appValuesTypes: state.appValuesTypes,
        // appLabels: state.appLabels,
        // appPlaceholders: state.appPlaceholders,
        // calendar: state.calendar,
        // uploadFileError: state.uploadFileError,
        // media: state.media,
        // about: state.about,
        // services: state.services,
        // menu: state.menu,
        // schedule: state.schedule,
        // burger: state.burger,
        // gallery: state.gallery,
        // faq: state.faq,
        // checkout: state.checkout,
        // contact: state.contact,
        // footerNewsletter: state.footerNewsletter,
        // landing: state.landing,
        // testimonials: state.testimonials,
        // paymentMethods: state.paymentMethods,
        // selected: state.selected,
        // paymentType: state.paymentType,
        // disclaimer: state.disclaimer,
        // filters: state.filters,
        // filtered: state.filtered,
        // appliedFilters: state.appliedFilters,
        // isFiltered: state.isFiltered,
        // filterToggle: state.filterToggle,
        // updateBurger: (a) => updateBurger(dispatch, a),
        // updateMenu: (a) => updateMenu(dispatch, a),
        // newsletter: (a) => newsletter(dispatch, a),
        // selectPaymentType: (a) => selectPaymentType(dispatch, a),
        // readyCheckout: (a, b, c) => readyCheckout(dispatch, a, b, c),
        // seeDetails: (a) => seeDetails(dispatch, a),
        // resetSelect: () => resetSelect(dispatch),
        // updateFilter: (a, b) => updateFilter(dispatch, a, b),
        // updateAppliedFilter: (a, b) => updateAppliedFilter(dispatch, a, b),
        // resetFilter: (a) => resetFilter(dispatch, a),
        // uploadImage: (a, b) => uploadImage(dispatch, a, b),
        // getFiles: (a) => getFiles(dispatch, a),
        // uploadFile: (a) => uploadFile(dispatch, a),
        // updateApp: (a) => updateApp(dispatch, a),
        // deleteApp: (a) => deleteApp(dispatch, a),
        // getAppWithAppId: (a) => getAppWithAppId(dispatch, a),
        // setEditApp: (a) => setEditApp(dispatch, a),
        // updateEditAppState: (a) => dispatch({ type: "SET_EDIT_APP", payload: a }),
        // addPage: (a) => addPage(dispatch, a, appId, getLatestAppData),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
