import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const fetchAccessTokenData = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get("/auth/access-token");
  console.log("data :>> ", data);
  // dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data.accessToken });
  // // if (data.user) updateUser(data.user);
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
