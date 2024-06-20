import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AuthDispatchProps } from "auth-context";
import { AUTH_ACTIONS } from "@actions/AuthActions";

export const fetchRefreshToken = async ({ dispatch, setAccessToken }: AuthDispatchProps) => {
  // require key variable
  if (!setAccessToken) throw Error("setAccessToken is required");
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosAuth.post("/auth/refresh-token");
    setAccessToken(data);
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    // cookies could not be verified
    axiosError({ type: "auth", dispatch, error, target: "refresh-token" });
  }
};
