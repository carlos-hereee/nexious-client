import { ChildProps } from "app-types";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { DUser, IUserSchema } from "user-context";
import userState from "@data/userState.json";
import { AuthContext } from "@context/auth/AuthContext";
import { USER_ACTIONS } from "@actions/UserActions";
import { reducer } from "./UserReducer";
import { addUserPost } from "./request/addUserPost";

export const UserContext = createContext<IUserSchema>({} as IUserSchema);
export const UserState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, userState);
  const { updateUser } = useContext(AuthContext);

  const addPost = useCallback((data: DUser) => addUserPost({ dispatch, ...data, updateUser }), []);
  const setUserRequestStatus = useCallback((data: string) => dispatch({ type: USER_ACTIONS.SET_STATUS, payload: data }), []);

  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      userRequestStatus: state.userRequestStatus,
      addPost,
      setUserRequestStatus,
    };
  }, [state.isLoading, state.userRequestStatus]);
  return <UserContext.Provider value={storeValues}>{children}</UserContext.Provider>;
};
