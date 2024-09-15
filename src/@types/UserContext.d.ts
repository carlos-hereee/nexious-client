declare module "user-context" {
  import { Post } from "media-context";
  import { USER_ACTIONS } from "@actions/UserActions";
  import { UserSchema } from "auth-context";

  export interface DUser {
    post?: Post;
  }
  export interface UserStateProps {
    // user: UserSchema;
    isLoading: boolean;
    userRequestStatus: string;
  }

  export interface IUserSchema extends UserStateProps {
    addPost: (data: DUser) => void;
    setUserRequestStatus: (data: string) => void;
  }

  export interface UserDispatchProps {
    dispatch: React.Dispatch<UserActionProps>;
    updateUser?: (user: UserSchema) => void;
    post?: Post;
  }

  export type UserActionProps =
    | { type: USER_ACTIONS.IS_LOADING; payload: boolean }
    | { type: USER_ACTIONS.SET_STATUS; payload: string };
}
