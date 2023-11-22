import { axiosAuth } from "@app/utils/axios/axiosAuth";
// import { isDev } from "@app/config";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthForgotPasswordFormProps } from "auth-context";

export const setForgotPassword = async (props: AuthForgotPasswordFormProps) => {
  const { dispatch, credentials } = props;
  // try {
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.post("/auth/forgot-password", credentials);
  dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {
  //   isDev && console.log("forgot password error ", error);
  //   dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
  //   dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  // }
};
