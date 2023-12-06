import { createContext, useCallback, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import { LogMessageItem, LogSchema } from "log-context";
import logState from "@data/logState.json";
import { reducer } from "./LogReducer";
import { addToLog } from "./disptach/addToLog";
import { removeFromLog } from "./disptach/removeFromLog";

export const LogContext = createContext<LogSchema>({} as LogSchema);

export const LogState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, logState);

  const addMessageToLog = useCallback((a: LogMessageItem) => {
    addToLog({ dispatch, data: a });
  }, []);
  const removeMessageFromLog = useCallback((a: LogMessageItem) => {
    removeFromLog({ dispatch, data: a, log: state.log });
  }, []);

  const logValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      log: state.log,
      addMessageToLog,
      removeMessageFromLog,
    };
  }, [state.isLoading, addMessageToLog, removeMessageFromLog]);
  return <LogContext.Provider value={logValues}>{children}</LogContext.Provider>;
};
