import { userMinData } from "@hooks/userMinData";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const setUser = (props: AuthDispatchProps) => {
  //  key varaibles
  const { dispatch, user } = props;
  if (user) {
    const formatUser = userMinData(user);
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: formatUser });
    if (user.ownedApps) dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
    if (user.subscriptions) {
      dispatch({ type: AUTH_ACTIONS.SET_SUBSCRIPTIONS, payload: user.subscriptions });
    }
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
