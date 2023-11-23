// import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
// import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthLoginReducerProps } from "auth-context";

export const singIn = async (props: AuthLoginReducerProps) => {
  const { credentials, setAccessToken } = props;
  // try {
  // dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.post("/auth/login", credentials);
  if (data && setAccessToken) setAccessToken(data || "");
};
