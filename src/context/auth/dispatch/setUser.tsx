import { userMinData } from "@app/utils/app/userMinData";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthReducerProps } from "auth-context";

export const setUser = (props: AuthReducerProps) => {
  //  key varaibles
  const { dispatch, user } = props;
  if (user) {
    dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: userMinData(user) });
    console.log("user :>> ", user);
    if (user.ownedApps) dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
