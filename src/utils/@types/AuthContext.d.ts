declare module "auth-context" {
  import { AuthErrorProps } from "app-errors";
  import { AUTH_ACTIONS } from "@actions/AuthActions";
  import { AppListProps } from "app-types";
  import {
    AuthFormValueProps,
    ForgotPasswordFormProps,
    FormProps,
    LoginFormValues,
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
    subscriptions?: AppListProps[];
    ownedApps?: AppListProps[];
  }

  export interface AuthStateProps {
    // auth schema
    isLoading: boolean;
    // emergencyPasswordChangeIsRequired: boolean;
    accessToken: string;
    ownedApps: AppListProps[];
    authErrors: AuthErrorProps;
    user: UserSchema;
    dummyUser: LoginFormValues;
    userForm: FormProps;
    loginForm: FormProps;
    signUpForm: FormProps;
    passwordChangeForm: FormProps;
    subscriptions: AppListProps[];
    forgotPasswordForm: FormProps;
    theme: string;
    locale: string;
  }
  // export interface
  export interface AuthSchema extends AuthStateProps {
    logout: () => void;
    resetStranded: () => void;
    resetAuthErrors: () => void;
    setAccessToken: (accessToken: string) => void;
    login: (values: LoginFormValues) => void;
    register: (values: RegisterFormProps) => void;
    setDummyUser: (values: LoginFormValues) => void;
    updateUser: (values: UserSchema) => void;
    forgotPassword: (values: ForgotPasswordFormProps) => void;
    setTheme: (key: string) => void;
    subscribe: (appId: string) => void;
    unSubscribe: (appId: string) => void;
  }

  export interface AuthDispatchProps {
    dispatch: React.Dispatch<AuthActionProps>;
    credentials?: AuthFormValueProps;
    user?: UserSchema;
    data?: string;
    accessToken?: string;
    login?: LoginFormValues;
    appId?: string;
    updateUser?: (user: UserSchema) => void;
    setDummyUser?: (user: LoginFormValues) => void;
    setAccessToken?: (token: string) => void;
  }

  export type AuthActionProps =
    | {
        type: AUTH_ACTIONS.IS_LOADING | AUTH_ACTIONS.SET_STRANDED | AUTH_ACTIONS.SET_USER_NOT_FOUND;
        payload: boolean;
      }
    | {
        type:
          | AUTH_ACTIONS.SIGN_IN_ERROR
          | AUTH_ACTIONS.LOGOUT_ERROR
          | AUTH_ACTIONS.FORGOT_PASSWORD_ERROR
          | AUTH_ACTIONS.CHANGE_PASSWORD_ERROR
          | AUTH_ACTIONS.SIGN_UP_ERROR
          | AUTH_ACTIONS.SET_ACCESS_TOKEN
          | AUTH_ACTIONS.SET_THEME;
        payload: string;
      }
    | {
        type: AUTH_ACTIONS.SET_OWNED_APPS | AUTH_ACTIONS.SET_SUBSCRIPTIONS;
        payload: AppListProps[];
      }
    | { type: AUTH_ACTIONS.SET_DUMMY_DATA; payload: LoginFormValues }
    | { type: AUTH_ACTIONS.SET_USER_DATA; payload: UserSchema }
    | { type: AUTH_ACTIONS.SET_ERROR; payload: AuthErrorProps };
}
