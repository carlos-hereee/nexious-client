import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/actions/AuthActions";
import { AuthReducerProps } from "auth-context";
import { AxiosError } from "axios";

export const singIn = async (props: AuthReducerProps) => {
  const { credentials, dispatch } = props;
  if (dispatch) {
    try {
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
      const { data } = await axiosAuth.post("/auth/login", credentials);
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data || "" });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    } catch (error) {
      const err = error as AxiosError;
      // console.log("err :>> ", err);
      dispatch({ type: AUTH_ACTIONS.SIGN_IN_ERROR, payload: `${err.response?.data}` });
      dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    }
  }
};
