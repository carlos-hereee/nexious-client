import { createContext, useReducer, useMemo, useCallback } from "react";
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
import { setUnsubscribe } from "./request/setUnsubscribe";
import { clearAuthErrors } from "./dispatch/clearAuthErrors";
import { clearStranded } from "./dispatch/clearStranded";
import { updateDumnyData } from "./dispatch/updateDummyData";
import { updateTheme } from "./dispatch/updateTheme";
import { updateAccessToken } from "./dispatch/updateAccessToken";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);

  const setDummyUser = useCallback((user: LoginValues) => updateDumnyData({ dispatch, login: user }), []);
  const updateUser = useCallback((user: UserSchema) => setUser({ dispatch, user }), []);

  const register = useCallback((e: RegisterFormProps) => singUp({ dispatch, credentials: e }), []);
  const login = useCallback((e: LoginValues) => singIn({ dispatch, login: e, setDummyUser }), []);
  const resetAuthErrors = useCallback(() => clearAuthErrors({ dispatch }), []);
  const setAccessToken = useCallback((accessToken: string) => updateAccessToken({ dispatch, accessToken }), []);
  const forgotPassword = useCallback((e: ForgotPasswordValues) => setForgotPassword({ dispatch, credentials: e }), []);
  const resetStranded = useCallback(() => clearStranded({ dispatch }), []);
  const logout = useCallback(() => signOut({ dispatch }), []);

  const setTheme = useCallback((data: string) => updateTheme({ dispatch, data }), []);
  const subscribe = useCallback((e: string) => setSubscribe({ dispatch, appId: e, updateUser }), []);
  const unSubscribe = useCallback((e: string) => setUnsubscribe({ dispatch, appId: e, updateUser }), []);

  const authValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      authErrors: state.authErrors,
      accessToken: state.accessToken,
      user: state.user,
      dummyUser: state.dummyUser,
      theme: state.theme,
      locale: state.locale,
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
      unSubscribe,
      setDummyUser,
      resetStranded,
      resetAuthErrors,
      setAccessToken,
    };
  }, [state.accessToken, state.isLoading, state.theme, state.user, JSON.stringify(state.authErrors)]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
