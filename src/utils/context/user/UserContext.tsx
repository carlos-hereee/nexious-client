import { ChildProps } from "app-types";
import { createContext, useCallback, useMemo, useReducer } from "react";
import { DUser, IUserSchema } from "user-context";
import userState from "@data/userState.json";
import { reducer } from "./UserReducer";
import { addUserPost } from "./request/addUserPost";

export const UserContext = createContext<IUserSchema>({} as IUserSchema);
export const UserState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, userState);

  const addPost = useCallback((data: DUser) => addUserPost({ dispatch, ...data }), []);

  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      addPost,
    };
  }, [state.isLoading]);
  return <UserContext.Provider value={storeValues}>{children}</UserContext.Provider>;
};
