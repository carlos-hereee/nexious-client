import { createContext, useCallback, useMemo, useReducer } from "react";
import mediaState from "@data/mediaState.json";
import { ChildProps } from "app-types";
import { IMediaState } from "media-context";
import { reducer } from "./MediaReducer";

export const MediaContext = createContext<IMediaState>({} as IMediaState);

export const MediaState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, mediaState);

  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      error: state.error,
    };
  }, [state.isLoading, state.error]);
  return <MediaContext.Provider value={storeValues}> {children}</MediaContext.Provider>;
};
