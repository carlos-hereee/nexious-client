import { createContext, useCallback, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import { LogMessage, LogSchema } from "log-context";
import logState from "@data/logState.json";
import { LOG_ACTIONS } from "@actions/LogActions";
import { reducer } from "./LogReducer";
import { addToLog } from "./disptach/addToLog";
import { removeFromLog } from "./disptach/removeFromLog";

export const LogContext = createContext<LogSchema>({} as LogSchema);

export const LogState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...logState, status: "PRE-LAUNCH", page: "public" });

  // add message
  const addMessageToLog = useCallback((a: LogMessage) => addToLog({ dispatch, data: a }), []);
  // remove message
  const removeMessageFromLog = useCallback((a: LogMessage) => removeFromLog({ dispatch, data: a, log: state.log }), []);
  const setPage = useCallback((a: "public" | "private") => dispatch({ type: LOG_ACTIONS.SET_PAGE, payload: a }), []);

  const logValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      log: state.log,
      status: state.status,
      page: state.page,
      addMessageToLog,
      removeMessageFromLog,
      setPage,
    };
  }, [state.isLoading, state.status, state.log, state.page]);

  return <LogContext.Provider value={logValues}>{children}</LogContext.Provider>;
};
