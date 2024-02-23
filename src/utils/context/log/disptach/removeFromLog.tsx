import { LOG_ACTIONS } from "@actions/LogActions";
import { LogDispatchProps } from "log-context";

export const removeFromLog = (props: LogDispatchProps) => {
  const { dispatch, data, log } = props;
  // require key variable
  if (!data) throw Error("data is required");
  if (!log) throw Error("log is required");
  dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
  // use filter to remove unwanted data
  const message = log.filter((i) => i.uid !== data.uid);
  dispatch({ type: LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG, payload: message });
};
