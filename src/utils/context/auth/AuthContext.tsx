// eslint-disable-next-line no-unused-vars
import { createContext, useReducer, useEffect, useContext } from "react";
import { reducer } from "./AuthReducer";
import authState from "../../../data/authState.json";
import { login } from "./helpers/login";
import { register } from "./helpers/register";
import { logOut } from "./helpers/logout";
import { updateUser } from "./helpers/updateUser";
import { changePassword } from "./helpers/changePassword";
import { getAccessToken } from "./helpers/getAccessToken";
import { forgotPassword } from "./helpers/forgotPassword";
import { fetchUser } from "./helpers/fetchUser";
import { ChildProps } from "app-types";
import { AuthSchema } from "auth-context";
import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";

export const AuthContext = createContext<AuthSchema>({} as AuthSchema);

export const AuthState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, authState);

  useEffect(() => {
    getAccessToken({ dispatch, updateUser: (e) => updateUser({ dispatch, user: e }) });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading: state.isLoading,
        isOffline: state.isOffline,
        authErrors: state.authErrors,
        accessToken: state.accessToken,
        user: state.user,
        userForm: state.userForm,
        loginForm: state.loginForm,
        signUpForm: state.signUpForm,
        passwordChangeForm: state.passwordChangeForm,
        forgotPasswordForm: state.forgotPasswordForm,
        emergencyPasswordChangeIsRequired: state.emergencyPasswordChangeIsRequired,
        ownedApps: state.ownedApps,
        setStranded: (e) => dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: e }),
        setIsLoading: (e) => dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: e }),
        setAccessToken: (e) => dispatch({ type: AUTH_ACTIONS.SET_ACCESS_TOKEN, payload: e }),
        logout: () => logOut(dispatch),
        updateUser: (e) => updateUser({ dispatch, user: e }),
        fetchUser: (a) => fetchUser(dispatch, a),
        changePassword: (e) => changePassword(dispatch, e),
        forgotPassword: (a) => forgotPassword(dispatch, a),
        login: (e) =>
          login({
            dispatch,
            credentials: e,
            updateUser: (user) => updateUser({ dispatch, user }),
          }),
        register: (e) =>
          register({
            dispatch,
            credentials: e,
            updateUser: (user) => updateUser({ dispatch, user }),
          }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an auth provider");
  }
  return context;
};
