declare module "auth-context" {
  import { AUTH_ACTIONS } from "@app/utils/types/AuthActions";
  import { AppListProps } from "app-context";
  import {
    AuthFormValueProps,
    ForgotPasswordFormProps,
    FormProps,
    RegisterFormProps,
  } from "app-forms";

  export interface UserSchema {
    // uid: string;
    userId: string;
    username: string;
    email?: string;
    nickname?: string;
    languageId?: string;
    phone?: string;
    ownedApps?: AppListProps[];
  }
  export interface AuthErrorProps {
    emergencyPasswordChangeIsRequired: boolean;
    signInError: string;
    signUpError: string;
    changePasswordError: string;
    forgotPasswordError: string;
  }

  export interface AuthStateProps {
    // auth schema
    isLoading: boolean;
    isOffline: boolean;
    // emergencyPasswordChangeIsRequired: boolean;
    accessToken: string;
    ownedApps: AppListProps[];
    authErrors: AuthErrorProps;
    user: UserSchema;
    userForm: FormProps;
    loginForm: FormProps;
    signUpForm: FormProps;
    passwordChangeForm: FormProps;
    forgotPasswordForm: FormProps;
    theme: string;
    locale: string;
  }
  // export interface
  export interface AuthSchema {
    // auth schema
    isLoading: boolean;
    isOffline: boolean;
    accessToken: string;
    theme: string;
    locale: string;
    ownedApps: AppListProps[];
    authErrors: AuthErrorProps;
    user: UserSchema;
    userForm: FormProps;
    loginForm: FormProps;
    signUpForm: FormProps;
    passwordChangeForm: FormProps;
    forgotPasswordForm: FormProps;
    // methods
    // setIsLoading: (values: boolean) => void;
    // setStranded: (values: boolean) => void;
    // setAccessToken: (values: string) => void;
    // getAccessToken: () => void;
    // getAccessTokenData: () => void;
    login: (values: AuthFormValueProps) => void;
    register: (values: RegisterFormProps) => void;
    logout: () => void;
    updateUser: (values: UserSchema) => void;
    // fetchUser: (values: UserSchema) => void;
    forgotPassword: (values: ForgotPasswordFormProps) => void;
    // changePassword: (values: UserSchema) => void;
    setTheme: (key: string) => void;
  }

  export interface AuthDispatchProps {
    dispatch: React.Dispatch<AuthActionProps>;
  }
  export interface AuthReducerProps {
    dispatch: React.Dispatch<AuthActionProps>;
    credentials?: AuthFormValueProps;
    user?: UserSchema;
    data?: string;
    updateUser?: (user: UserSchema) => void;
    setAccessToken?: (token: string) => void;
  }

  export type AuthActionProps =
    | { type: AUTH_ACTIONS.IS_LOADING | AUTH_ACTIONS.SET_STRANDED; payload: boolean }
    | {
        type:
          | AUTH_ACTIONS.SIGN_IN_ERROR
          | AUTH_ACTIONS.FORGOT_PASSWORD_ERROR
          | AUTH_ACTIONS.CHANGE_PASSWORD_ERROR
          | AUTH_ACTIONS.SIGN_UP_ERROR
          | AUTH_ACTIONS.SET_ACCESS_TOKEN
          | AUTH_ACTIONS.SET_THEME;
        payload: string;
      }
    | { type: AUTH_ACTIONS.SET_OWNED_APPS; payload: AppListProps[] }
    // | {
    //     type: AUTH_ACTIONS.UPDATE_SHIPPING_DETAILS;
    //     payload: AppListProps[];
    //   }
    | { type: AUTH_ACTIONS.SET_USER_DATA; payload: UserSchema }
    | { type: AUTH_ACTIONS.SET_ERROR; payload: AuthErrorProps };
}
