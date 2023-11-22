import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { UpdateUserReducerProps } from "auth-context";

export const setUser = (props: UpdateUserReducerProps) => {
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
  // if(user.o)
  user.ownedApps && dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
  user.permissions && dispatch({ type: AUTH_ACTIONS.SET_PERMSSIONS, payload: user.permissions });
};
