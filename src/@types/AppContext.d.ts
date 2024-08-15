declare module "app-context" {
  import { IEvent } from "app-calendar";
  import { MerchProps } from "store-context";
  import { ISubscription, UserSchema } from "auth-context";
  import { AppAssets } from "app-admin";
  import { APP_ACTIONS } from "@actions/AppActions";
  import {
    AdminIdProps,
    AppListProps,
    AppProps,
    CalendarProps,
    ContactApp,
    MediaItemProp,
    MediaProps,
    MenuProp,
    Message,
    NewsletterProps,
    Notification,
    PageProps,
    StoreProps,
    Subcription,
    SubcriptionProp,
    ThemeList,
  } from "app-types";

  export interface AppCardProps {
    app: AppListProps;
    theme?: string;
    errorMessage?: string;
  }

  export interface StripeUpdateConfigProps {
    readPrivacyPolicy?: boolean;
    currency?: string;
  }
  export interface AppStateProps {
    // auth schema
    isLoading: boolean;
    loadingState: { isLoadingInventory: boolean };
    isOnline: boolean;

    appList: AppListProps[];
    themeList: ThemeList[];
    iconList: IconListItem[];
    appError: string;
    redirectUrl: string;
    appMessage?: string;
    appName: string;
    email: string;
    activeAppName: string;
    welcomeMessage: string;
    landing?: PageProps;
    appId: string;
    appUrl: string;
    appLink: string;
    activeAppId: string;
    owner: UserSchema;
    appUsers: UserSchema[];
    adminIds: AdminIdProps[];
    notifications: Notification[];
    newsletter: NewsletterProps;
    pages: PageProps[] | [];
    page: PageProps;
    activePage: PageProps;
    media: MediaProps;
    socialMedia: MediaItemProp;
    activeMedia: MediaProps;
    menu: MenuProp[];
    activeMenu: MenuProp[];
    logo: string;
    activeLogo: string;
    languageList: MenuProp[];
    locale: string;
    dbVersion?: string;
    calendar: CalendarProps;
    store: StoreProps;
    platformTiers: ISubscription[];
    inventory: MerchProps[];
    subscriptionTiers: ISubscription[];
    messages: Message[];
  }
  // app context schema
  export interface AppSchema extends AppStateProps {
    updateAppData: (props: AppAssets) => void;
    // updateStripeConfig: (config: StripeConfig) => void;
    getAppWithName: (appName: string, setAsActive?: boolean) => void;
    getPlatformData: () => void;
    setAppLoading: (isLoading: boolean) => void;
    setActivePage: (page: PageProps) => void;
    setSocialMedia: (media: MediaItemProp) => void;
    getStoreInventory: (storeId: string) => void;
    getStripeAccountLink: (appId: string) => void;
    signUpWithStripe: (appId: string) => void;
    clearNotification: ({ appId: string, id: string }) => void;
    getPageWithId: (appName: string) => void;
    upgradeToLatest: (appId: string) => void;
    setAppMessage: (appId: string) => void;
    getAppUsers: (appId: string) => void;
    createSubscription: (appId: SubcriptionProp) => void;
    updateSubscription: (appId: SubcriptionProp) => void;
    deleteSubscription: (appId: SubcriptionProp) => void;

    contactApp: (props: ContactApp) => void;
    updateActiveAppData: (props: ActiveMenuProp) => void;
  }

  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    app?: AppProps;
    page?: PageProps;
    store?: StoreProps;
    calendar?: CalendarProps;
    appList?: AppListProps[];
    platformTiers?: ISubscription[];
    logo?: string;
    event?: IEvent;
    id?: string;
    userId?: string;
    media?: MediaProps;
    message?: { [x: string]: string };
    appName?: string;
    pageId?: string;
    config?: StripeUpdateConfigProps;
    subscription?: Subcription;
    themeList?: ThemeList[];
    storeId?: string;
    isLoading?: boolean;
    setAsActive?: boolean;
    appId?: string;
    menu?: MenuProp[];
    updateAppData?: (a: AppProps) => void;
    updateUser?: (a: UserSchema) => void;
    updateActiveAppData?: (a: ActiveMenuProp) => void;
  }

  export type AppActionProps =
    | { type: APP_ACTIONS.IS_LOADING | APP_ACTIONS.COOMING_SOON; payload: boolean }
    | { type: APP_ACTIONS.SET_LOADING_STATE; payload: { [key: string]: boolean } }
    | {
        type:
          | APP_ACTIONS.SET_APP_ID
          | APP_ACTIONS.SET_APP_URL
          | APP_ACTIONS.SET_APP_LINK
          | APP_ACTIONS.SET_ACTIVE_APP_ID
          | APP_ACTIONS.SET_APP_LOGO
          | APP_ACTIONS.SET_ACTIVE_LOGO
          | APP_ACTIONS.SET_APP_NAME
          | APP_ACTIONS.SET_APP_ERROR
          | APP_ACTIONS.SET_LOCALE
          | APP_ACTIONS.SET_DB_VERSION
          | APP_ACTIONS.SET_APP_MESSAGE
          | APP_ACTIONS.SET_ACTIVE_APP_NAME
          | APP_ACTIONS.SET_REDIRECT_URL;
        payload: string;
      }
    | { type: APP_ACTIONS.SET_THEME_LIST; payload: ThemeList[] }
    | { type: APP_ACTIONS.SET_LANGUAGES; payload: MenuProp[] }
    | { type: APP_ACTIONS.SET_STRIPE_CONFIG; payload: StripeConfig }
    | { type: APP_ACTIONS.SET_OWNER; payload: UserSchema }
    | { type: APP_ACTIONS.SET_APP_USERS; payload: UserSchema[] }
    | { type: APP_ACTIONS.SET_STORE_INVENTORY; payload: MerchProps[] }
    | { type: APP_ACTIONS.SET_ACTIVE_MENU | APP_ACTIONS.SET_MENU; payload: MenuProp[] }
    | { type: APP_ACTIONS.SET_LANDING | APP_ACTIONS.SET_ACTIVE_PAGE | APP_ACTIONS.SET_PAGE; payload: PageProps }
    | { type: APP_ACTIONS.SET_PAGES; payload: PageProps[] }
    | { type: APP_ACTIONS.SET_APP_MESSAGES; payload: Message[] }
    | { type: APP_ACTIONS.SET_STORE; payload: StoreProps }
    | { type: APP_ACTIONS.SET_CALENDAR; payload: CalendarProps }
    | { type: APP_ACTIONS.SET_APP_LIST; payload: AppListProps[] }
    | { type: APP_ACTIONS.SET_APP_SUBSCRIPTIONS | APP_ACTIONS.SET_PLATFORM_TIERS; payload: ISubscription[] }
    | { type: APP_ACTIONS.SET_NEWSLETTER; payload: NewsletterProps }
    | { type: APP_ACTIONS.SET_MEDIA | APP_ACTIONS.SET_ACTIVE_MEDIA; payload: MediaProps }
    | { type: APP_ACTIONS.SET_NOTIFICATIONS; payload: Notification[] }
    | { type: APP_ACTIONS.SET_MEDIA_ITEM; payload: MediaItemProp }
    | { type: APP_ACTIONS.SET_ADMIN_IDS; payload: AdminIdProps[] };
}
