declare module "auth-context" {
  import { AUTH_ACTIONS } from "@actions/AuthActions";
  import { AuthErrorTarget } from "app-errors";
  import { AppListProps, Notification } from "app-types";
  import { AuthFormValueProps, ForgotPasswordValues, FormProps, LoginValues, RegisterFormProps } from "app-forms";

  export interface AuthErrorProps {
    logout: string;
    login: string;
    register: string;
    subscribe: string;
    offline: string;
    forgotPassword: string;
    [x: AuthErrorTarget]: string;
    // emergencyPasswordChangeIsRequired: string;
    // userNotFound: string;
    // serverIsOffline: string;
    // changePasswordError: string;
  }
  export interface SubsciptionFeatures {
    featureId: string;
    name: string;
    value: string;
    valueType: "Checkbox" | "Message";
  }
  export interface SubscriptionSchema {
    subscriptionId: string;
    // stripe generated id
    productId?: string;
    // stripe generated id
    priceId?: string;
    thumbnail: string;
    name: string;
    description: string;
    recurring: "day" | "month" | "week" | "year";
    cost: number;
    productId: string;
    priceId: string;
    isPlatformSubscription: boolean;
    link: string;
    features: SubsciptionFeatures[];
  }
  export interface UserSchema {
    // uid: string;
    userId: string;
    username: string;
    isPlatformOwner?: boolean;
    email?: string;
    nickname?: string;
    name?: string;
    languageId?: string;
    phone?: string;
    subscriptions?: AppListProps[];
    notifications?: Notification[];
    ownedApps?: AppListProps[];
    accountTier?: SubscriptionSchema;
    accountTiers?: SubscriptionSchema[];
  }

  export interface AuthStateProps {
    // auth schema
    isLoading: boolean;
    isPlatformOwner: boolean;
    // emergencyPasswordChangeIsRequired: boolean;
    accessToken: string;
    ownedApps: AppListProps[];
    notifications: Notification[];
    authErrors: AuthErrorProps;
    user: UserSchema;
    dummyUser: LoginValues;
    userForm: FormProps;
    loginForm: FormProps;
    signUpForm: FormProps;
    passwordChangeForm: FormProps;
    subscriptions: AppListProps[];
    forgotPasswordForm: FormProps;
    accountTier?: SubscriptionSchema;
    accountTiers?: SubscriptionSchema[];
    theme: string;
    locale: string;
  }
  // export interface
  export interface AuthSchema extends AuthStateProps {
    logout: () => void;
    resetStranded: () => void;
    resetAuthErrors: () => void;
    setAccessToken: (accessToken: string) => void;
    login: (values: LoginValues) => void;
    fetchUser: (values: LoginValues) => void;
    register: (values: RegisterFormProps) => void;
    setDummyUser: (values: LoginValues) => void;
    updateUser: (values: UserSchema) => void;
    editUser: (values: UserSchema) => void;
    updateTier: (values: UserSchema) => void;
    forgotPassword: (values: ForgotPasswordValues) => void;
    changePassword: (values: ForgotPasswordValues) => void;
    setTheme: (key: string) => void;
    clearNotification: (key: string) => void;
    subscribe: (appId: string) => void;
  }

  export interface AuthDispatchProps {
    dispatch: React.Dispatch<AuthActionProps>;
    credentials?: AuthFormValueProps;
    user?: UserSchema;
    data?: string;
    accessToken?: string;
    login?: LoginValues;
    appId?: string;
    updateUser?: (user: UserSchema) => void;
    setDummyUser?: (user: LoginValues) => void;
    setAccessToken?: (token: string) => void;
  }

  export type AuthActionProps =
    | { type: AUTH_ACTIONS.IS_LOADING | AUTH_ACTIONS.SET_PLATFORM_OWNER; payload: boolean }
    | { type: AUTH_ACTIONS.SET_ACCESS_TOKEN | AUTH_ACTIONS.SET_THEME; payload: string }
    | { type: AUTH_ACTIONS.SET_OWNED_APPS | AUTH_ACTIONS.SET_SUBSCRIPTIONS; payload: AppListProps[] }
    | { type: AUTH_ACTIONS.SET_DUMMY_DATA; payload: LoginValues }
    | { type: AUTH_ACTIONS.SET_ACCOUNT_TIER; payload: SubscriptionSchema }
    | { type: AUTH_ACTIONS.SET_ACCOUNT_TIERS; payload: SubscriptionSchema[] }
    | { type: AUTH_ACTIONS.SET_USER_DATA; payload: UserSchema }
    | { type: AUTH_ACTIONS.SET_NOTIFICATIONS; payload: Notification[] }
    | { type: AUTH_ACTIONS.SET_ERROR; payload: { [x: AuthErrorTarget]: string } };
}
