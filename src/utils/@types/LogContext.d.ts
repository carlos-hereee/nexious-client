declare module "log-context" {
  import { LOG_ACTIONS } from "@app/utils/@types/actions/LogActions";

  export interface LogMessageItem {
    uid: string;
    message: string;
    status: number;
    hint?: string;
  }
  export interface LogSchema {
    isLoading: boolean;
    log: LogMessageItem[];
  }
  export interface LogReducerProps {
    dispatch: any;
    data: LogMessageItem;
    log?: LogMessageItem[];
  }
  export type LogActionProps =
    | { type: LOG_ACTIONS.IS_LOADING; payload: boolean }
    | {
        type: LOG_ACTIONS.REMOVE_MESSAGE_FROM_LOG | LOG_ACTIONS.ADD_MESSAGE_TO_LOG;
        payload: LogMessageItem[];
      };
}
