declare module "auth-context" {
  import { OrderSchema, StripeConfirmationProps } from "store-context";
  import { A_ACTIONS } from "@actions/AuthActions";
  import { AuthErrorTarget } from "app-errors";
  import { AppListProps, Message, Notification } from "app-types";
  import { AuthFormValueProps, EmailParam, ForgotPasswordValues, FormProps, LoginValues, RegisterFormProps } from "app-forms";

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
  export interface AddressSchema {
    address: string;
  }
  export interface ISubscription {
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
  export interface NSettings {
    // account notifications
    muteAllAccount: boolean;
    newFeatures: boolean;
    promotionalNotifications: boolean;
    milestones: boolean;
    subscriptionRenewal: boolean;
    //
    // // auth notifications  RESEARCH IF SHOULD INCLUDE
    // loginAlerts: boolean;
    // accountChanges: boolean;
    // suspiciousActivity: boolean;
    //
    // checkout notifications
    muteAllCheckout: boolean;
    orderConfirmations: boolean;
    paymentReceipts: boolean;
    // calendar
    muteAllCalendar: boolean;
    eventReminders: boolean;
    taskReminders: boolean;
    // social notifications
    muteAllSocial: boolean;
    messages: boolean;
    mentionsTags: boolean;
    activityAlerts: boolean;
  }
  export interface NotificationSettings {
    notifications: NSettings;
    email: NSettings;
    phone: NSettings;
  }
  export interface UserSchema {
    // uid: string;
    userId: string;
    createdAt?: string;
    customerId?: string;
    avatar?: string;
    username: string;
    isPlatformOwner?: boolean;
    email?: string;
    nickname?: string;
    name?: string;
    languageId?: string;
    likePosts?: string[];
    likeMessages?: string[];
    phone?: string;
    subscriptions?: AppListProps[];
    notifications?: Notification[];
    ownedApps?: AppListProps[];
    notificationSettings?: NotificationSettings;
    accountTier?: ISubscription;
    orders?: OrderSchema[];
    messages?: Message[];
    contacts?: UserContact[];
    accountTiers?: ISubscription[];
  }
  export interface CustomerSub {
    user: UserSchema;
    stripeConfirmation?: StripeConfirmationProps;
    plan?: ISubscription;
  }
  export interface UserContact {
    name: string;
    avatar: string;
    userId: string;
  }
  export interface AuthStateProps {
    // auth schema
    isLoading: boolean;
    isPlatformOwner: boolean;
    tierUpdate?: ISubscription;
    // emergencyPasswordChangeIsRequired: boolean;
    accessToken: string;
    ownedApps: AppListProps[];
    notifications: Notification[];
    likeMessages: string[];
    authErrors: AuthErrorProps;
    notificationSettings?: NotificationSettings;
    user: UserSchema;
    orders?: OrderSchema[];
    dummyUser: LoginValues;
    userForm: FormProps;
    loginForm: FormProps;
    signUpForm: FormProps;
    passwordChangeForm: FormProps;
    subscriptions: string[];
    forgotPasswordForm: FormProps;
    accountTier?: ISubscription;
    accountTiers: ISubscription[];
    messages: Message[];
    theme: string;
    likePosts: string[];
    locale: string;
    contacts: UserContact[];
  }
  // export interface
  export interface AuthSchema extends AuthStateProps {
    logout: () => void;
    resetStranded: () => void;
    resetAuthErrors: () => void;
    setUpdateTier: (plan?: ISubscription) => void;
    setAccessToken: (accessToken: string) => void;
    login: (values: LoginValues) => void;
    fetchUser: (values: LoginValues) => void;
    register: (values: RegisterFormProps) => void;
    setDummyUser: (values: LoginValues) => void;
    updateUser: (values: UserSchema) => void;
    editUser: (values: UserSchema) => void;
    updateTier: (values: CustomerSub) => void;
    addTier: (values: CustomerSub) => void;
    forgotPassword: (values: ForgotPasswordValues) => void;
    changePassword: (values: ForgotPasswordValues) => void;
    setTheme: (key: string) => void;
    clearNotification: (key: string) => void;
    subscribe: (appId: string) => void;
    updateAvatar: (user: { [x: string]: string }) => void;
    emailSettings: (settings: EmailParam) => void;
  }

  export interface AuthDispatchProps {
    dispatch: React.Dispatch<AuthActionProps>;
    credentials?: AuthFormValueProps;
    user?: UserSchema;
    data?: string | { [x: string]: string };
    stripeConfirmation?: StripeConfirmationProps;
    plan?: ISubscription;
    accessToken?: string;
    orders?: OrderSchema[];
    login?: LoginValues;
    appId?: string;
    settings?: { [x: string]: boolean };
    active?: string;
    postId?: string;
    updateUser?: (user: UserSchema) => void;
    setDummyUser?: (user: LoginValues) => void;
    setAccessToken?: (token: string) => void;
  }

  export type AuthActionProps =
    | { type: A_ACTIONS.IS_LOADING | A_ACTIONS.SET_PLATFORM_OWNER; payload: boolean }
    | { type: A_ACTIONS.SET_ACCESS_TOKEN | A_ACTIONS.SET_THEME; payload: string }
    | { type: A_ACTIONS.SET_OWNED_APPS | A_ACTIONS.SET_SUBSCRIPTIONS; payload: AppListProps[] }
    | { type: A_ACTIONS.SET_DUMMY_DATA; payload: LoginValues }
    | { type: A_ACTIONS.SET_ORDERS; payload: OrderSchema[] }
    | { type: A_ACTIONS.SET_ACCOUNT_TIER | A_ACTIONS.SET_UPDATE_TIER; payload: ISubscription | undefined }
    | { type: A_ACTIONS.SET_ACCOUNT_TIERS; payload: ISubscription[] }
    | { type: A_ACTIONS.SET_USER_DATA; payload: UserSchema }
    | { type: A_ACTIONS.SET_USER_MESSAGES; payload: Message[] }
    | { type: A_ACTIONS.SET_LIKED_POSTS | A_ACTIONS.SET_LIKE_MESSAGES; payload: string[] }
    | { type: A_ACTIONS.SET_USER_CONTACTS; payload: UserContact[] }
    | { type: A_ACTIONS.SET_NOTIFICATIONS; payload: Notification[] }
    | { type: A_ACTIONS.SET_NOTIFICATION_SETTINGS; payload: NotificationSettings }
    | { type: A_ACTIONS.SET_ERROR; payload: { [x: AuthErrorTarget]: string } };
}
