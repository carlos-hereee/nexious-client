import { LOG_ACTIONS } from "@app/utils/@types/actions/LogActions";
import { responseError } from "@app/utils/app/axiosResponseError";
import { LogReducerProps } from "log-context";

export const addToLog = (props: LogReducerProps) => {
  const { dispatch, data } = props;
  try {
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: true });
    // const message = data.filter((i: any) => i.uid !== data.uid);

    dispatch({ type: LOG_ACTIONS.ADD_MESSAGE_TO_LOG, payload: data });
  } catch (error) {
    responseError(error, "adding message to log");
    dispatch({ type: LOG_ACTIONS.IS_LOADING, payload: false });
  }
};
