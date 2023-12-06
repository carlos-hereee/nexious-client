import { createContext, useReducer, useContext, useMemo, useCallback, useEffect } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, UserSchema } from "auth-context";
import { AuthFormValueProps, ForgotPasswordFormProps, RegisterFormProps } from "app-forms";
import { AUTH_ACTIONS } from "@app/utils/@types/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { reducer } from "./AuthReducer";
import { singIn } from "./request/singIn";
import { singUp } from "./request/singUp";
import { signOut } from "./request/signOut";
import { setUser } from "./dispatch/setUser";
// import { changePassword } from "./helpers/changePassword";
import { setForgotPassword } from "./request/setForgotPassword";
import { fetchRefreshToken } from "./request/fetchRefreshToken";
// import { fetchAccessTokenData } from "./helpers/fetchAccessTokenData";
// import { fetchAccessToken } from "../admin/requests/fetchAccessToken";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);
  const navigate = useNavigate();
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
    navigate("/dashboard");
  }, []);
  const register = useCallback((e: RegisterFormProps) => singUp({ dispatch, credentials: e }), []);
  const login = useCallback((e: AuthFormValueProps) => singIn({ dispatch, credentials: e }), []);
  const logout = useCallback(() => signOut({ dispatch }), []);

  const authValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      isOffline: state.isOffline,
      authErrors: state.authErrors,
      accessToken: state.accessToken,
      user: state.user,
      theme: state.theme,
      locale: state.locale,
      userForm: state.userForm,
      loginForm: state.loginForm,
      signUpForm: state.signUpForm,
      passwordChangeForm: state.passwordChangeForm,
      forgotPasswordForm: state.forgotPasswordForm,
      ownedApps: state.ownedApps,
      register,
      updateUser,
      login,
      setTheme,
      logout,
      forgotPassword,
    };
  }, [state.accessToken, state.isLoading, state.theme, state.user]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
