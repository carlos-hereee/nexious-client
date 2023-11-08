import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";

export const logOut = async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    await axiosAuth.delete("/auth/logout");
    // reset user and access token
    dispatch({ type: "SET_USER_DATA", payload: {} });
    dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (e) {
    isDev && console.log("error occured logging out", error);
    const { status, data } = error.response;
    dispatch({ type: "SET_ERROR", payload: data });
    dispatch({ type: "IS_LOADING", payload: false });
  }
};
