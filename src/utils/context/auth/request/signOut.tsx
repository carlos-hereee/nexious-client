import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/@types/actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { AxiosError } from "axios";

export const signOut = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    await axiosAuth.delete("/auth/logout");
    // reset user and access token
    dispatch({
      type: AUTH_ACTIONS.SET_USER_DATA,
      payload: { username: "", email: "", phone: "", userId: "", ownedApps: [] },
    });
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: AUTH_ACTIONS.LOGOUT_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
