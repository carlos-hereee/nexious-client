import { axiosAuth } from "@axios/axiosAuth";
import { LogDispatchProps } from "log-context";
import { LOG_ACTIONS } from "@actions/LogActions";
import { axiosError } from "@axios/axiosError";
import { DataResponse } from "utils/@types/response";

export const fetchRefreshToken = async ({ dispatch, setAccessToken }: LogDispatchProps) => {
  // require key variable
  if (!setAccessToken) throw Error("setAccessToken is required");
  dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data }: DataResponse = await axiosAuth.post("/auth/refresh-token");
    dispatch({ type: LOG_ACTIONS.SET_LOG_STATUS, payload: "IDLE" });
    setAccessToken(data);
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    axiosError({ type: "log", dispatch, error });
  }
};
