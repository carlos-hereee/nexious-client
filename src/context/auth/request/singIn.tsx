import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthLoginReducerProps } from "auth-context";

export const singIn = async (props: AuthLoginReducerProps) => {
  const { credentials, dispatch } = props;
  if (dispatch) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post("/auth/login", credentials);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: data || "" });
  }
};
