import { APP_ACTIONS } from "@actions/AppActions";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { LOG_ACTIONS } from "@actions/LogActions";
import { AxiosResponseError } from "app-errors";
import { AxiosError } from "axios";
import { LogMessage } from "log-context";
import { uniqueId } from "nexious-library";

export const axiosError = ({ error, type, target, dispatch }: AxiosResponseError) => {
  // require key variable
  if (!dispatch) throw Error("authDispatch is required");
  // message for service disconnect
  const stranded = { stranded: "connection issues" };
  const err = error as AxiosError;
  // response message
  const message = `${err.response?.data}`;
  // auth response errors
  if (type === "auth") {
    // if service disconnect
    if (err.code === "ERR_NETWORK") dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: stranded });
    else dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: { [target]: message } });
    // update loading state
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
  // app response errors
  if (type === "app") {
    // if service disconnect
    if (err.code === "ERR_NETWORK") dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: message });
    //  subscribtions error
    // update loading state
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
  if (type === "log") {
    const logMessage: LogMessage = { message: "", status: 500, uid: uniqueId() };
    // if service disconnect
    if (err.code === "ERR_NETWORK") {
      logMessage.message = "service disconnected";
      dispatch({ type: LOG_ACTIONS.ADD_MESSAGE_TO_LOG, payload: logMessage });
    }
    // update loading state
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  }
};
