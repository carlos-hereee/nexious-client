import { axiosAuth } from "@axios/axiosAuth";
import { LogDispatchProps } from "log-context";
import { LOG_ACTIONS } from "@actions/LogActions";
// import { AxiosError } from "axios";

export const fetchRefreshToken = async (props: LogDispatchProps) => {
  const { dispatch, setAccessToken } = props;
  dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
  try {
    const { data } = await axiosAuth.post("/auth/refresh-token");
    dispatch({ type: LOG_ACTIONS.SET_LOG_STATUS, payload: "IDLE" });
    if (setAccessToken) setAccessToken(data);
  } catch (error) {
    // console.log("error :>> ", error);
    // const err = error as AxiosError;
    dispatch({ type: LOG_ACTIONS.SET_LOG_STATUS, payload: "IDLE" });
    // const { response } = err;
    // if (getAppList) getAppList();
    // console.log("response :>> ", response);
    if (setAccessToken) setAccessToken("");
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  }
};
