import { LOG_ACTIONS } from "@actions/LogActions";
import { LogActionProps, LogState } from "log-context";

export const reducer = (state: LogState, action: LogActionProps): LogState => {
  switch (action.type) {
    case LOG_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case LOG_ACTIONS.SET_LOG_STATUS:
      return { ...state, status: action.payload };
    case LOG_ACTIONS.SET_PAGE:
      return { ...state, page: action.payload };
    case LOG_ACTIONS.ADD_MESSAGE_TO_LOG:
      return { ...state, log: [...state.log, action.payload] };
    case LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG:
      return { ...state, log: action.payload };
    default:
      return state;
  }
};
