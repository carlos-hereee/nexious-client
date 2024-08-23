import { createContext, useReducer, useMemo, useCallback, useEffect } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, CustomerSub, ISubscription, UserSchema } from "auth-context";
import { ForgotPasswordValues, LoginValues, RegisterFormProps } from "app-forms";
import { A_ACTIONS } from "@actions/AuthActions";
import { reducer } from "./AuthReducer";
import { singIn } from "./request/singIn";
import { singUp } from "./request/singUp";
import { signOut } from "./request/signOut";
import { setUser } from "./dispatch/setUser";
import { setForgotPassword } from "./request/setForgotPassword";
import { setSubscribe } from "./request/setSubscribe";
import { clearAuthErrors } from "./dispatch/clearAuthErrors";
import { clearStranded } from "./dispatch/clearStranded";
import { updateDumnyData } from "./dispatch/updateDummyData";
import { updateAccessToken } from "./dispatch/updateAccessToken";
import { fetchRefreshToken } from "./request/fetchRefreshToken";
import { editUserRequest } from "./request/editUserRequest";
import { removeNotification } from "./request/removeNotification";
import { getUser } from "./request/getUser";
import { setChangePassword } from "./request/changePassword";
import { upgradeTier } from "./request/upgradeTier";
import { customerSubscription } from "./request/customerSubsctiption";
import { editAvatar } from "./request/editAvatar";
import { toggleLikePost } from "./request/toggleLikePost";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);

  // udpate accesstoken
  const setAccessToken = useCallback((accessToken: string) => updateAccessToken({ dispatch, accessToken }), []);
  // get accessToken
  useEffect(() => {
    fetchRefreshToken({ dispatch, setAccessToken });
  }, []);

  // user data
  const setDummyUser = useCallback((user: LoginValues) => updateDumnyData({ dispatch, login: user }), []);
  const fetchUser = useCallback((user: LoginValues) => getUser({ dispatch, login: user }), []);
  const updateUser = useCallback((user: UserSchema) => setUser({ dispatch, user }), []);
  const editUser = useCallback((user: UserSchema) => editUserRequest({ dispatch, user, updateUser }), []);
  const updateTier = useCallback((data: CustomerSub) => upgradeTier({ dispatch, ...data, updateUser }), []);
  const addTier = useCallback((data: CustomerSub) => customerSubscription({ dispatch, ...data, updateUser }), []);
  const updateAvatar = useCallback((data: { [x: string]: string }) => editAvatar({ dispatch, data, updateUser }), []);
  // auth
  const register = useCallback((e: RegisterFormProps) => singUp({ dispatch, credentials: e }), []);
  const login = useCallback((e: LoginValues) => singIn({ dispatch, login: e, setDummyUser }), []);
  const forgotPassword = useCallback((e: ForgotPasswordValues) => setForgotPassword({ dispatch, credentials: e }), []);
  const changePassword = useCallback((e: ForgotPasswordValues) => setChangePassword({ dispatch, credentials: e }), []);
  const logout = useCallback(() => signOut({ dispatch }), []);
  // auth errors
  const resetAuthErrors = useCallback(() => clearAuthErrors({ dispatch }), []);
  const resetStranded = useCallback(() => clearStranded({ dispatch }), []);
  // user actions
  const setTheme = useCallback((data: string) => dispatch({ type: A_ACTIONS.SET_THEME, payload: data }), []);
  const setUpdateTier = useCallback((a?: ISubscription) => dispatch({ type: A_ACTIONS.SET_UPDATE_TIER, payload: a }), []);
  const subscribe = useCallback((appId: string) => setSubscribe({ dispatch, appId, updateUser }), []);
  const clearNotification = useCallback((data: string) => removeNotification({ dispatch, data, updateUser }), []);
  const updateLikePost = useCallback((postId: string) => toggleLikePost({ dispatch, postId, updateUser }), []);

  const authValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      isPlatformOwner: state.isPlatformOwner,
      authErrors: state.authErrors,
      accessToken: state.accessToken,
      user: state.user,
      dummyUser: state.dummyUser,
      theme: state.theme,
      locale: state.locale,
      notifications: state.notifications,
      userForm: state.userForm,
      loginForm: state.loginForm,
      signUpForm: state.signUpForm,
      passwordChangeForm: state.passwordChangeForm,
      forgotPasswordForm: state.forgotPasswordForm,
      ownedApps: state.ownedApps,
      accountTier: state.accountTier,
      messages: state.messages,
      tierUpdate: state.tierUpdate,
      contacts: state.contacts,
      orders: state.orders,
      accountTiers: state.accountTiers,
      subscriptions: state.subscriptions,
      likePosts: state.likePosts,
      register,
      updateUser,
      login,
      setTheme,
      logout,
      forgotPassword,
      subscribe,
      setDummyUser,
      editUser,
      resetStranded,
      resetAuthErrors,
      setAccessToken,
      clearNotification,
      fetchUser,
      changePassword,
      updateTier,
      setUpdateTier,
      addTier,
      updateAvatar,
      updateLikePost,
    };
  }, [
    state.accessToken,
    state.isLoading,
    state.theme,
    state.tierUpdate,
    state.user,
    state.likePosts,
    state.authErrors,
    state.accountTiers,
    state.notifications,
  ]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
