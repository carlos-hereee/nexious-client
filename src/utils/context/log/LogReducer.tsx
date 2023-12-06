import { LOG_ACTIONS } from "@app/utils/@types/actions/LogActions";
import { LogActionProps, LogSchema } from "log-context";

export const reducer = (state: LogSchema, action: LogActionProps): LogSchema => {
  switch (action.type) {
    case LOG_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case LOG_ACTIONS.ADD_MESSAGE_TO_LOG:
      return { ...state, log: action.payload };
    case LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG:
      return { ...state, log: action.payload };
    default:
      return state;
  }
};
