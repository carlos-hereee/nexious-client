// import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthLoginReducerProps } from "auth-context";

export const singIn = async (props: AuthLoginReducerProps) => {
  // const { credentials, dispatch } = props;
  const { credentials, dispatch } = props;
  if (dispatch) {
    // try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/login", credentials);
    console.log("data :>> ", data);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data || "" });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
    // if (data && setAccessToken) setAccessToken(data || "");
  }
};
