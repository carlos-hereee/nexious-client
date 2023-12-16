import { axiosAuth } from "@axios/axiosAuth";
import { LogDispatchProps } from "log-context";
import { LOG_ACTIONS } from "@actions/LogActions";

export const fetchRefreshToken = async (props: LogDispatchProps) => {
  const { dispatch, setAccessToken } = props;
  dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosAuth.post("/auth/refresh-token");
    dispatch({ type: LOG_ACTIONS.SET_LOG_STATUS, payload: "IDLE" });
    if (setAccessToken) setAccessToken(data);
  } catch (error) {
    // const err = error as AxiosError;
    console.log("error :>> ", error);
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
    dispatch({ type: LOG_ACTIONS.SET_LOG_STATUS, payload: "IDLE" });
    if (setAccessToken) setAccessToken("");
  }
};
