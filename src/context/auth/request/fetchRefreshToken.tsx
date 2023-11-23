import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const fetchRefreshToken = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  const { data } = await axiosAuth.post("/auth/refresh-token");
  dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data || "" });
};
