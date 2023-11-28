import { userMinData } from "@app/utils/app/userMinData";
import { AUTH_ACTIONS } from "@app/utils/actions/AuthActions";
import { AuthReducerProps } from "auth-context";

export const setUser = (props: AuthReducerProps) => {
  //  key varaibles
  const { dispatch, user } = props;
  if (user) {
    const formatUser = userMinData(user);
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: formatUser });
    if (user.ownedApps) dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
