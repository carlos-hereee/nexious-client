import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const clearAuthErrors = async (props: AuthDispatchProps) => {
  const { dispatch } = props;
  try {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({
      type: AUTH_ACTIONS.SET_ERROR,
      payload: {
        emergencyPasswordChangeIsRequired: false,
        serverIsOffline: false,
        userNotFound: false,
        signInError: "",
        signUpError: "",
        changePasswordError: "",
        logOutError: "",
        forgotPasswordError: "",
      },
    });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
