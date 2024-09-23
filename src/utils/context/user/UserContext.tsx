import { ChildProps } from "app-types";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import { DUser, IUserSchema } from "user-context";
import userState from "@data/userState.json";
import { AuthContext } from "@context/auth/AuthContext";
import { USER_ACTIONS } from "@actions/UserActions";
import { UserSchema } from "auth-context";
import { reducer } from "./UserReducer";
import { addUserPost } from "./request/addUserPost";
import { updateUserData } from "./dispatch/updateUserData";
import { addTaskBoard } from "./request/addTaskBoard";

export const UserContext = createContext<IUserSchema>({} as IUserSchema);
export const UserState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, userState);
  const { updateUser } = useContext(AuthContext);

  const addPost = useCallback((data: DUser) => addUserPost({ dispatch, ...data, updateUser }), []);
  const setUserRequestStatus = useCallback((data: string) => dispatch({ type: USER_ACTIONS.SET_STATUS, payload: data }), []);
  const setUserData = useCallback((user: UserSchema) => updateUserData({ dispatch, user }), []);
  const createTaskBoard = useCallback((values: { [x: string]: string }) => addTaskBoard({ dispatch, values }), []);

  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      userRequestStatus: state.userRequestStatus,
      calendarEvents: state.calendarEvents,
      user: state.user,
      boards: state.boards,
      addPost,
      setUserRequestStatus,
      setUserData,
      createTaskBoard,
    };
  }, [state.isLoading, state.userRequestStatus, state.calendarEvents, state.boards]);
  return <UserContext.Provider value={storeValues}>{children}</UserContext.Provider>;
};
