declare module "user-context" {
  import { IEvent } from "app-calendar";
  import { Post } from "media-context";
  import { USER_ACTIONS } from "@actions/UserActions";
  import { UserSchema } from "auth-context";

  export interface DUser {
    post?: Post;
  }
  export interface UserCalendar {
    calendarId: string;
  }
  export interface UserStateProps {
    // user: UserSchema;
    isLoading: boolean;
    userRequestStatus: string;
    calendarEvents: IEvent[];
    user: UserSchema;
  }

  export interface IUserSchema extends UserStateProps {
    addPost: (data: DUser) => void;
    setUserRequestStatus: (data: string) => void;
    setUserData: (user: UserSchema) => void;
  }

  export interface UserDispatchProps {
    dispatch: React.Dispatch<UserActionProps>;
    updateUser?: (user: UserSchema) => void;
    post?: Post;
    user?: UserSchema;
  }

  export type UserActionProps =
    | { type: USER_ACTIONS.IS_LOADING; payload: boolean }
    | { type: USER_ACTIONS.SET_STATUS; payload: string }
    | { type: USER_ACTIONS.SET_USER_CALENDAR; payload: IEvent[] }
    | { type: USER_ACTIONS.SET_USER_DATA; payload: UserSchema };
}
