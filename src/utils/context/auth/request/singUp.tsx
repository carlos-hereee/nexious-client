// import { isDev } from "@app/config";
import { axiosAuth } from "@axios/axiosAuth";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { AxiosError } from "axios";

export const singUp = async (props: AuthDispatchProps) => {
  const { dispatch, credentials } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/register", credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data || "" });
  } catch (error) {
    const err = error as AxiosError;
    if (err.code === "ERR_NETWORK") {
      dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: true });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    } else {
      dispatch({ type: AUTH_ACTIONS.SIGN_UP_ERROR, payload: `${err.response?.data}` });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
