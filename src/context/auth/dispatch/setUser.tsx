import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { AuthReducerSetUserProps } from "auth-context";

export const setUser = (props: AuthReducerSetUserProps) => {
  //  key varaibles
  const { dispatch, user } = props;
  const userData = {
    // id: user._id,
    userId: user.userId,
    username: user.username,
    email: user.email || "",
    nickname: user.nickname || "",
    languageId: user.languageId || "",
    phone: user.phone || "",
  };
  dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: userData });
  if (user.ownedApps) dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
  // if (user.permissions) dispatch({ type: AUTH_ACTIONS.SET_PERMSSIONS, payload: user.permissions });
};
