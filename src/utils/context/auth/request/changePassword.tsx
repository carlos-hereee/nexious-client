import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { isDev } from "@config";

export const setChangePassword = async ({ credentials, dispatch }: AuthDispatchProps) => {
  if (!credentials) throw Error("credentials param is required");
  try {
    // require key variable
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/auth/change-password/${credentials?.username}`, credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    if (isDev) console.log("error", error);
    // const { status, data } = error.response;
    // if (status === 403) {
    //   dispatch({ type: "CHANGE_PASSWORD_ERROR", payload: data });
    // }
    // dispatch({ type: "IS_LOADING", payload: false });
  }
};
