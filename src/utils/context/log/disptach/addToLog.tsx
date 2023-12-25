import { LOG_ACTIONS } from "@actions/LogActions";
import { responseError } from "@app/axiosResponseError";
import { LogDispatchProps } from "log-context";

export const addToLog = (props: LogDispatchProps) => {
  const { dispatch, data, log } = props;
  try {
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
    // add message to log
    if (data && log) {
      log.push(data);
      dispatch({ type: LOG_ACTIONS.ADD_MESSAGE_TO_LOG, payload: log });
    }
  } catch (error) {
    responseError(error, "adding message to log");
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  }
};
