import { LOG_ACTIONS } from "@app/utils/@types/actions/LogActions";
import { responseError } from "@app/utils/app/axiosResponseError";
import { LogMessageItem, LogReducerProps } from "log-context";

export const removeFromLog = (props: LogReducerProps) => {
  const { dispatch, data, log } = props;
  try {
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
    if (log) {
      // use filter to remove unwanted data
      const message = log.filter((i: LogMessageItem) => i.uid !== data.uid);
      dispatch({ type: LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG, payload: message });
    }
  } catch (error) {
    responseError(error, "remove message from log");
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  }
};
