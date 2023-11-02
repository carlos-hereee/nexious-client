import { createContext, useReducer } from "react";
import { reducer } from "./LogReducer";
import { addMessageToLog } from "./helpers/addMessageToLog";
import { removeMessageFromLog } from "./helpers/removeMessageFromLog";
export const LogContext = createContext();

export const LogState = ({ children }) => {
  const initialState = { isLoading: false, log: [] };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LogContext.Provider
      value={{
        log: state.log,
        isLoading: state.isLoading,
        addMessageToLog: (a) => addMessageToLog(dispatch, a),
        removeMessageFromLog: (a) => removeMessageFromLog(dispatch, a),
      }}>
      {children}
    </LogContext.Provider>
  );
};
