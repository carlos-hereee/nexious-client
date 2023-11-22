// import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthLoginReducerProps } from "auth-context";

export const singIn = async (props: AuthLoginReducerProps) => {
  const { dispatch, credentials, updateUser } = props;
  // try {
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.post("/auth/login", credentials);
  if (data.user) updateUser(data.user);
  dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data?.accessToken || "" });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  // } catch (error: any) {
  //   if (isDev) console.log("sign in error", error);
  //   const { status, data } = error.response;
  //   if (status === 401 && data.includes("security is low")) {
  //     dispatch({ type: AUTH_ACTIONS.SET_CHANGE_PASSWORD, payload: data });
  //   }
  //   if (status === 403 || status === 404 || status === 400) {
  //     dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: data });
  //   }
  //   dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
  //   dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  // }
};
