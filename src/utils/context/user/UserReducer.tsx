import { USER_ACTIONS } from "@actions/UserActions";
import { UserActionProps, UserStateProps } from "user-context";

export const reducer = (state: UserStateProps, action: UserActionProps): UserStateProps => {
  switch (action.type) {
    case USER_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};
