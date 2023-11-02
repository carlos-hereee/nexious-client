import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";
import offline from "@data/offlineAppState.json";

export const getLatestAppData = async (dispatch: React.Dispatch<any>, appId: string) => {
  try {
    dispatch({ type: "IS_LOADING", payload: false });
    const { data } = await axiosAuth.get(`/app/latest/${appId}`);
    console.log("data", data);
    const { app } = data;
    app.menu && dispatch({ type: "SET_MENU", payload: app.menu });
    app.logo && dispatch({ type: "UPDATE_LOGO", payload: app.logo });
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error: any) {
    if (isDev) console.log("error fetching latest app data: ", error);
    // server is offline
    if (!error.response) {
      dispatch({ type: "UPDATE_APP_ASSETS", payload: offline });
    }
    const response = error.response;
    // server sent offline data
    if (response.status === 400) {
      dispatch({ type: "UPDATE_APP_ASSETS", payload: response.data });
    }
    if (response.status === 404) {
      dispatch({ type: "COMING_SOON", payload: true });
    }
    dispatch({ type: "IS_LOADING", payload: false });
  }
};
