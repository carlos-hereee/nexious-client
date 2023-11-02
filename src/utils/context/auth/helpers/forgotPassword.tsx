import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";

export const forgotPassword = async (dispatch, credentials) => {
  try {
    dispatch({ type: "IS_LOADING", payload: true });
    const { data } = await axiosAuth.post("/auth/forgot-password", credentials);
    dispatch({ type: "SET_ACCESS_TOKEN", payload: data });
    dispatch({ type: "IS_LOADING", payload: false });
  } catch (error) {
    isDev && console.log("forgot password error ", error);
    dispatch({ type: "SET_ACCESS_TOKEN", payload: "" });
    dispatch({ type: "IS_LOADING", payload: false });
  }
};
