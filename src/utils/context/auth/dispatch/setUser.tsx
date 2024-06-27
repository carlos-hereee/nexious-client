import { AUTH_ACTIONS } from "@actions/AuthActions";
import { userMinData } from "@formatters/userMinData";
import { AuthDispatchProps } from "auth-context";

export const setUser = ({ user, dispatch }: AuthDispatchProps) => {
  // require key variable
  if (!user) throw Error("user is required");
  const formatUser = userMinData(user);
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: AUTH_ACTIONS.SET_USER_DATA, payload: formatUser });
  if (user.ownedApps) dispatch({ type: AUTH_ACTIONS.SET_OWNED_APPS, payload: user.ownedApps });
  if (user.subscriptions) dispatch({ type: AUTH_ACTIONS.SET_SUBSCRIPTIONS, payload: user.subscriptions });
  if (user.notifications) dispatch({ type: AUTH_ACTIONS.SET_NOTIFICATIONS, payload: user.notifications });
  if (user.accountTier) dispatch({ type: AUTH_ACTIONS.SET_ACCOUNT_TIER, payload: user.accountTier });
  if (user.accountTiers) dispatch({ type: AUTH_ACTIONS.SET_ACCOUNT_TIERS, payload: user.accountTiers });
  if (user.isPlatformOwner) dispatch({ type: AUTH_ACTIONS.SET_PLATFORM_OWNER, payload: user.isPlatformOwner });
  dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
};
