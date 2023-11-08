import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";

export const setEditApp = async (dispatch, appId) => {
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    const { data } = await axiosAuth.get(`app/latest/${appId}`);
    if (data.app) {
      const { app } = data;
      const editAppData = {
        appName: app.appName || "",
        themeList: app.themeList || [],
        calendar: app.calendar || {},
        newsletter: app.newsletter || {},
        menu: app.menu.filter((item) => !item.isPrivate && !item.isToggle) || [],
        media: app.media || [{}],
        language: app.languageId || {},
      };
      dispatch({ type: "SET_EDIT_APP", payload: editAppData });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error) {
    isDev && console.log("error setting edit app", error);
    dispatch({ type: "IS_LOADING", payload: false });
  }
};
