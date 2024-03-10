import { LOG_ACTIONS } from "@actions/LogActions";
import { LogDispatchProps } from "log-context";

// add message to log
export const addToLog = ({ dispatch, data }: LogDispatchProps) => {
  // require key variable
  if (!data) throw Error("data is required");
  dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: LOG_ACTIONS.ADD_MESSAGE_TO_LOG, payload: data });
};
