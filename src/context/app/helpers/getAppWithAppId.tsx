// import { axiosAuth } from "@app/utils/axios/axiosAuth";
// import { isDev } from "@app/config";

// export const getAppWithAppId = async (dispatch, appId) => {
//   try {
//     const { data } = await axiosAuth.get(`app/latest/${appId}`);
//     if (data.app) {
//       const { app } = data;
//       dispatch({ type: "UPDATE_APP_ASSETS", payload: app });
//       app.menu && dispatch({ type: "SET_MENU", payload: app.menu });
//       app.logo && dispatch({ type: "UPDATE_LOGO", payload: app.logo });
//     }
//     if (data.pages) {
//       dispatch({ type: "UPDATE_PAGES", payload: data.pages });
//     }
//     dispatch({ type: "IS_LOADING", payload: false });
//   } catch (error) {
//     isDev && console.log("error getting app with app id", error);
//   }
// };
