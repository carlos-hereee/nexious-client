declare module "log-context" {
  import { LOG_ACTIONS } from "@actions/LogActions";

  export type APP_STATUS = "PRE-LAUNCH" | "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
  export interface LogMessage {
    uid: string;
    message: string;
    status: number;
    hint?: string;
  }
  export interface LogSchema {
    isLoading: boolean;
    status: APP_STATUS;
    log: LogMessage[] | [];
  }
  export interface LogDispatchProps {
    dispatch: React.Dispatch<LogActionProps>;
    setAccessToken?: (accessToken: string) => void;
    data?: LogMessage;
    status?: APP_STATUS;
    log?: LogMessage[];
  }

  export type LogActionProps =
    | { type: LOG_ACTIONS.IS_LOADING; payload: boolean }
    | { type: LOG_ACTIONS.SET_LOG_STATUS; payload: APP_STATUS }
    | { type: LOG_ACTIONS.ADD_MESSAGE_TO_LOG; payload: LogMessage }
    | { type: LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG; payload: LogMessage[] };
}
