import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { ChildProps } from "app-types";
import { LogMessageItem, LogSchema } from "log-context";
import logState from "@data/logState.json";
import { AuthContext } from "@context/auth/AuthContext";
import { reducer } from "./LogReducer";
import { addToLog } from "./disptach/addToLog";
import { removeFromLog } from "./disptach/removeFromLog";
import { fetchRefreshToken } from "./requests/fetchRefreshToken";

export const LogContext = createContext<LogSchema>({} as LogSchema);

export const LogState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, { ...logState, status: "PRE-LAUNCH" });
  const { setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    fetchRefreshToken({ dispatch, setAccessToken });
  }, []);

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
      status: state.status,
      addMessageToLog,
      removeMessageFromLog,
    };
  }, [state.isLoading, state.status]);
  return <LogContext.Provider value={logValues}>{children}</LogContext.Provider>;
};
