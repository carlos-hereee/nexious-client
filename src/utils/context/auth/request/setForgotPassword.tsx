import { axiosAuth } from "@axios/axiosAuth";
// import { isDev } from "@app/config";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthReducerProps } from "auth-context";
import { AxiosError } from "axios";

export const setForgotPassword = async (props: AuthReducerProps) => {
  const { dispatch, credentials } = props;
  try {
    if (credentials) {
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosAuth.post("/auth/forgot-password", credentials);
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === "ERR_NETWORK") {
      dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: true });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    } else {
      //   isDev && console.log("forgot password error ", error);
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
