import { createContext, useReducer, useMemo, useCallback, useEffect } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, UserSchema } from "auth-context";
import { ForgotPasswordValues, LoginValues, RegisterFormProps } from "app-forms";
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
import { updateTheme } from "./dispatch/updateTheme";
import { updateAccessToken } from "./dispatch/updateAccessToken";
import { fetchRefreshToken } from "./request/fetchRefreshToken";
import { editUserRequest } from "./request/editUserRequest";
import { removeNotification } from "./request/removeNotification";
import { getUser } from "./request/getUser";
import { setChangePassword } from "./request/changePassword";

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
  const setTheme = useCallback((data: string) => updateTheme({ dispatch, data }), []);
  const subscribe = useCallback((appId: string) => setSubscribe({ dispatch, appId, updateUser }), []);
  const clearNotification = useCallback((data: string) => removeNotification({ dispatch, data, updateUser }), []);

  const authValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
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
      subscriptions: state.subscriptions,
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
    };
  }, [state.accessToken, state.isLoading, state.theme, state.user, state.authErrors]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
