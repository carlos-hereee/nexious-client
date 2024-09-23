import { USER_ACTIONS } from "@actions/UserActions";
import { userMinData } from "@app/userMinData";
import { UserDispatchProps } from "user-context";

export const updateUserData = ({ user, dispatch }: UserDispatchProps) => {
  if (!user) throw Error("param user is required");
  const formatUser = userMinData(user);
  dispatch({ type: USER_ACTIONS.IS_LOADING, payload: true });
  dispatch({ type: USER_ACTIONS.SET_USER_DATA, payload: formatUser });
  if (user.calendarEvents) dispatch({ type: USER_ACTIONS.SET_USER_CALENDAR, payload: user.calendarEvents });
  // if (user.subscriptions) dispatch({ type: USER_ACTIONS.SET_SUBSCRIPTIONS, payload: user.subscriptions });
  // if (user.messages) dispatch({ type: USER_ACTIONS.SET_USER_MESSAGES, payload: user.messages });
  // if (user.orders) dispatch({ type: USER_ACTIONS.SET_ORDERS, payload: user.orders });
  // if (user.notifications) dispatch({ type: USER_ACTIONS.SET_NOTIFICATIONS, payload: user.notifications });
  // if (user.accountTier) dispatch({ type: USER_ACTIONS.SET_ACCOUNT_TIER, payload: user.accountTier });
  // if (user.accountTiers) dispatch({ type: USER_ACTIONS.SET_ACCOUNT_TIERS, payload: user.accountTiers });
  // if (user.isPlatformOwner) dispatch({ type: USER_ACTIONS.SET_PLATFORM_OWNER, payload: user.isPlatformOwner });
  // if (user.contacts) dispatch({ type: USER_ACTIONS.SET_USER_CONTACTS, payload: user.contacts });
  // if (user.likePosts) dispatch({ type: USER_ACTIONS.SET_LIKED_POSTS, payload: user.likePosts });
  // if (user.likeMessages) dispatch({ type: USER_ACTIONS.SET_LIKE_MESSAGES, payload: user.likeMessages });
  // if (user.notificationSettings) dispatch({ type: USER_ACTIONS.SET_NOTIFICATION_SETTINGS, payload: user.notificationSettings });
  dispatch({ type: USER_ACTIONS.IS_LOADING, payload: false });
};
