import { createContext, useReducer, useContext, useMemo, useCallback, useEffect } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, UserSchema } from "auth-context";
import {
  AuthFormValueProps,
  ForgotPasswordFormProps,
  LoginFormValues,
  RegisterFormProps,
} from "app-forms";
import { AUTH_ACTIONS } from "@actions/AuthActions";
import { reducer } from "./AuthReducer";
import { singIn } from "./request/singIn";
import { singUp } from "./request/singUp";
import { signOut } from "./request/signOut";
import { setUser } from "./dispatch/setUser";
import { setForgotPassword } from "./request/setForgotPassword";
import { fetchRefreshToken } from "./request/fetchRefreshToken";
import { setSubscribe } from "./request/setSubscribe";
import { setUnsubscribe } from "./request/setUnsubscribe";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);
  useEffect(() => {
    fetchRefreshToken({ dispatch });
  }, []);

  const forgotPassword = useCallback((e: ForgotPasswordFormProps) => {
    setForgotPassword({ dispatch, credentials: e });
  }, []);

  const setTheme = useCallback((data: string) => {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_THEME, payload: data });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }, []);

  const updateUser = useCallback((user: UserSchema) => {
    setUser({ dispatch, user });
  }, []);
  const setDummyUser = useCallback((user: LoginFormValues) => {
    // setUser({ dispatch, user });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_DUMMY_DATA, payload: user });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }, []);

  const resetStranded = useCallback(() => {
    // setUser({ dispatch, user });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: false });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }, []);

  const register = useCallback((e: RegisterFormProps) => singUp({ dispatch, credentials: e }), []);
  const login = useCallback((e: AuthFormValueProps) => singIn({ dispatch, credentials: e }), []);
  const logout = useCallback(() => signOut({ dispatch }), []);

  const subscribe = useCallback((e: string) => {
    setSubscribe({ dispatch, appId: e, updateUser });
  }, []);

  const unSubscribe = useCallback((e: string) => {
    setUnsubscribe({ dispatch, appId: e, updateUser });
  }, []);

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
    };
  }, [state.accessToken, state.isLoading, state.theme, state.user, state.authErrors]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
