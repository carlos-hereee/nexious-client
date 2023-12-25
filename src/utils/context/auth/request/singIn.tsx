import { axiosAuth } from "@axios/axiosAuth";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";
import { AxiosError } from "axios";

export const singIn = async (props: AuthDispatchProps) => {
  const { login, dispatch, setDummyUser } = props;
  if (login) {
    try {
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosAuth.post("/auth/login", login);
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    } catch (error) {
      const err = error as AxiosError;
      if (err.code === "ERR_NETWORK") {
        dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: true });
        dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: `${err.response?.data}` });
        // user got password wrong
      } else if (err.response?.status === 403) {
        dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: `${err.response?.data}` });
        // user does not exists
      } else if (err.response?.status === 404) {
        dispatch({ type: AUTH_ACTIONS.SET_USER_NOT_FOUND, payload: true });
        dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: `${err.response?.data}` });
        if (setDummyUser) setDummyUser(login);
      }
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
