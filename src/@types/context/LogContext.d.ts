declare module "log-context" {
  import { LOG_ACTIONS } from "@actions/LogActions";

  export type APP_STATUS = "PRE-LAUNCH" | "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
  export type PageType = "public" | "private" | "app";

  export interface LogMessage {
    uid: string;
    message: string;
    status: number;
    hint?: string;
  }
  export interface LogState {
    isLoading: boolean;
    status: APP_STATUS;
    page: PageType;
    log: LogMessage[] | [];
  }
  export interface LogSchema extends LogState {
    setPage: (pageType: PageType) => void;
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
    | { type: LOG_ACTIONS.SET_PAGE; payload: PageType }
    | { type: LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG; payload: LogMessage[] };
}
