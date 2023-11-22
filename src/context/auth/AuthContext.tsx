// eslint-disable-next-line no-unused-vars
import { createContext, useReducer, useEffect, useContext, useMemo, useCallback } from "react";
import { ChildProps } from "app-types";
import authState from "@data/authState.json";
import { AuthSchema, UserSchema } from "auth-context";
// import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
import { reducer } from "./AuthReducer";
import { singIn } from "./helpers/singIn";
import { singUp } from "./helpers/singUp";
import { logOut } from "./helpers/logout";
import { setUser } from "./dispatch/setUser";
// import { changePassword } from "./helpers/changePassword";
import { getAccessToken } from "./helpers/getAccessToken";
import { forgotPassword } from "./helpers/forgotPassword";
// import { fetchUser } from "./helpers/fetchUser";
import { updateTheme } from "./dispatch/updateTheme";
import { LoginFormProps, RegisterFormProps } from "app-forms";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);

  const updateUser = useCallback((e: UserSchema) => {
    setUser({ dispatch, user: e });
  }, []);

  useEffect(() => {
    getAccessToken({ dispatch, updateUser });
  }, []);

  /**
 * {
        setStranded: (e) => dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: e }),
        setIsLoading: (e) => dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: e }),
        setAccessToken: (e) => dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: e }),
        logout: () => logOut({ dispatch }),
        updateUser: (e) => updateUser({ dispatch, user: e }),
        // fetchUser: (a) => fetchUser(dispatch, a),
        // changePassword: (e) => changePassword(dispatch, e),
        forgotPassword: (a) => forgotPassword({ dispatch, values: a }),
        setTheme: (a) => updateTheme({ dispatch, data: a }),
        login: (e) =>
          login({ dispatch, credentials: e, updateUser: (user) => updateUser({ dispatch, user }) }),
          */

  const login = useCallback((e: LoginFormProps) => {
    singIn({ dispatch, credential: e, updateUser });
  }, []);

  const register = useCallback((e: RegisterFormProps) => {
    singUp({ dispatch, credentials: e, updateUser });
  }, []);
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
    };
  }, []);

  return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
