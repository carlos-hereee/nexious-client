import { AUTH_ACTIONS } from "@app/utils/@types/actions/AuthActions";
import { AuthStateProps, AuthActionProps } from "auth-context";

export const reducer = (state: AuthStateProps, action: AuthActionProps): AuthStateProps => {
  switch (action.type) {
    case AUTH_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, authErrors: action.payload };
    case AUTH_ACTIONS.SET_STRANDED:
      return { ...state, isOffline: action.payload };
    // case AUTH_ACTIONS.UPDATE_LANGUAGE:
    //   return { ...state, language: action.payload };
    // case AUTH_ACTIONS.SET_APP_ID:
    //   return { ...state, appId: action.payload };
    // case AUTH_ACTIONS.SET_PERMSSIONS:
    //   return { ...state, permissions: action.payload };
    case AUTH_ACTIONS.SET_OWNED_APPS:
      return { ...state, ownedApps: action.payload };
    case AUTH_ACTIONS.SIGN_IN_ERROR:
      return { ...state, authErrors: { ...state.authErrors, signInError: action.payload } };
    case AUTH_ACTIONS.LOGOUT_ERROR:
      return { ...state, authErrors: { ...state.authErrors, logOutError: action.payload } };
    case AUTH_ACTIONS.FORGOT_PASSWORD_ERROR:
      return { ...state, authErrors: { ...state.authErrors, forgotPasswordError: action.payload } };
    // case AUTH_ACTIONS.SET_DUMMY_DATA:
    //   return { ...state, dummyData: action.payload };
    case AUTH_ACTIONS.CHANGE_PASSWORD_ERROR:
      return { ...state, authErrors: { ...state.authErrors, changePasswordError: action.payload } };
    case AUTH_ACTIONS.SIGN_UP_ERROR:
      return { ...state, authErrors: { ...state.authErrors, signUpError: action.payload } };
    case AUTH_ACTIONS.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case AUTH_ACTIONS.SET_USER_DATA:
      return { ...state, user: action.payload };
    // case AUTH_ACTIONS.UPDATE_SHIPPING_DETAILS:
    //   return { ...state, shippingDetails: action.payload };
    case AUTH_ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    // case AUTH_ACTIONS.SET_CHANGE_PASSWORD:
    //   return {
    //     ...state,
    //     signInError: action.payload,
    //     emergencyPasswordChangeIsRequired: action.payload ? true : false,
    //   };
    default:
      return state;
  }
};
