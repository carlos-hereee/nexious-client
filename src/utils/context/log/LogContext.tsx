import { createContext, useCallback, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import { LogMessage, LogSchema } from "log-context";
import logState from "@data/logState.json";
import { reducer } from "./LogReducer";
import { addToLog } from "./disptach/addToLog";
import { removeFromLog } from "./disptach/removeFromLog";

export const LogContext = createContext<LogSchema>({} as LogSchema);

export const LogState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...logState, status: "PRE-LAUNCH" });

  // add message
  const addMessageToLog = useCallback((a: LogMessage) => addToLog({ dispatch, data: a }), []);
  // remove message
  const removeMessageFromLog = useCallback((a: LogMessage) => removeFromLog({ dispatch, data: a, log: state.log }), []);

  const logValues = useMemo(() => {
    return { isLoading: state.isLoading, log: state.log, status: state.status, addMessageToLog, removeMessageFromLog };
  }, [state.isLoading, state.status, state.log]);

  return <LogContext.Provider value={logValues}>{children}</LogContext.Provider>;
};
