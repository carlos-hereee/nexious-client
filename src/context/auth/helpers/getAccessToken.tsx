import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { isDev } from "@app/config";
import { RefreshTokenReducerProps } from "auth-context";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
export const getAccessToken = async (props: RefreshTokenReducerProps) => {
  const { dispatch, updateUser } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/refresh-token");
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data.accessToken });
    if (data.user) updateUser(data.user);
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error: any) {
    if (isDev) console.log("error fetching token", error);
    const status = error.response?.status;
    // server is offline, rejected, or not found
    if (status === 403 || status === 404 || status === 403) {
      // forbiden -- no cookie
      dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: "" });
      dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: {} });
    }
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
