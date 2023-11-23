// eslint-disable-next-line no-unused-vars
import { createContext, useReducer, useContext, useMemo, useCallback } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, UserSchema } from "auth-context";
// import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { ForgotPasswordFormProps, LoginFormProps, RegisterFormProps } from "app-forms";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { reducer } from "./AuthReducer";
import { singIn } from "./helpers/singIn";
import { singUp } from "./helpers/singUp";
import { signOut } from "./helpers/signOut";
import { setUser } from "./dispatch/setUser";
// import { changePassword } from "./helpers/changePassword";
// import { getAccessToken } from "./helpers/getAccessToken";
import { setForgotPassword } from "./helpers/setForgotPassword";
// import { fetchUser } from "./helpers/fetchUser";
import { updateTheme } from "./dispatch/updateTheme";
import { fetchAccessTokenData } from "./helpers/fetchAccessTokenData";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);

  const updateUser = useCallback((e: UserSchema) => {
    setUser({ dispatch, user: e });
  }, []);

  // console.log("state.AuthFormValueProps :>> ", state.accessToken);
  // useEffect(() => {
  //   getAccessToken({ dispatch, updateUser });
  // }, [state.accessToken]);

  /**
 * {
updateUser: (e) => updateUser({ dispatch, user: e }),
// fetchUser: (a) => fetchUser(dispatch, a),
// changePassword: (e) => changePassword(dispatch, e),
forgotPassword: (a) => forgotPassword({ dispatch, values: a }),
*/

  const forgotPassword = useCallback((e: ForgotPasswordFormProps) => {
    setForgotPassword({ dispatch, credentials: e });
  }, []);

  const setAccessToken = useCallback((e: string) => {
    // console.log("e :>> ", e);
    dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: e });
  }, []);

  const setIsLoading = useCallback((e: boolean) => {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: e });
  }, []);

  const setStranded = useCallback((e: boolean) => {
    dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: e });
  }, []);

  const logout = useCallback(() => signOut({ dispatch }), []);

  const setTheme = useCallback((a: string) => {
    updateTheme({ dispatch, data: a });
  }, []);

  const login = useCallback((e: LoginFormProps) => {
    singIn({ credentials: e, setAccessToken });
  }, []);

  const register = useCallback((e: RegisterFormProps) => {
    singUp({ dispatch, credentials: e, setAccessToken });
  }, []);

  const getAccessTokenData = useCallback(() => {
    fetchAccessTokenData({ dispatch });
  }, [state.accessToken]);

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
      setStranded,
      setIsLoading,
      // setAccessToken,
      getAccessTokenData,
    };
  }, [state.accessToken]);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
