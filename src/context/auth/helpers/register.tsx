import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthReducerProps } from "auth-context";

export const register = async (props: AuthReducerProps) => {
  const { dispatch, credentials, updateUser } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/register", credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data?.accessToken || "" });
    updateUser(data.user);
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error: any) {
    if (isDev) console.log("register error", error);
    const { status, data } = error.response;
    dispatch({ type: AUTH_ACTIONS.SIGN_UP_ERROR, payload: data });
    dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: {} });
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
