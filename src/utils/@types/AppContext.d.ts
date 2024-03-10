declare module "app-context" {
  import { MerchProps } from "services-context";
  import { UserSchema } from "auth-context";
  import { AppAssets } from "app-admin";
  import { APP_ACTIONS } from "@actions/AppActions";
  import {
    AdminIdProps,
    AppListProps,
    CalendarProps,
    MediaProps,
    MenuItemProps,
    MenuProps,
    NewsletterProps,
    PageProps,
    StoreProps,
  } from "app-types";

  export interface AppCardProps {
    app: AppListProps;
    theme?: string;
    errorMessage?: string;
  }
  export interface StripeConfig {
    currency?: string;
    readPrivacyPolicy?: boolean;
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
    stripeConfig: StripeConfig;
    appList: AppListProps[];
    themeList: ThemeList[];
    iconList: IconListItem[];
    appError: string;
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
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    pages: PageProps[] | [];
    page: PageProps;
    media: MediaProps;
    activeMedia: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: string;
    activeLogo: string;
    languageList: MenuItemProps[];
    locale: string;
    calendar: CalendarProps;
    store: StoreProps;
    inventory: MerchProps[];
  }
  // app context schema
  export interface AppSchema extends AppStateProps {
    updateAppData: (props: AppAssets) => void;
    updateStripeConfig: (config: StripeConfig) => void;
    getAppWithName: (appName: string, setAsActive?: boolean) => void;
    getAppStore: (appName: string) => void;
    getAppList: () => void;
    setAppLoading: (isLoading: boolean) => void;
    getStoreInventory: (storeId: string) => void;
    getPageWithId: (appName: string) => void;
    updateActiveAppData: (props: ActiveMenuProps) => void;
    handleMenu: (props: MenuProps, appName: string, appId: string) => void;
  }

  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    app?: AppProps;
    page?: PageProps;
    store?: StoreProps;
    appList?: AppListProps[];
    logo?: string;
    media?: MediaProps;
    appName?: string;
    pageId?: string;
    config?: StripeUpdateConfigProps;
    subscriptions?: AppListProps[];
    storeId?: string;
    isLoading?: boolean;
    setAsActive?: boolean;
    appId?: string;
    menu?: MenuProps[];
    updateAppData?: (a: AppProps) => void;
    updateActiveAppData?: (a: ActiveMenuProps) => void;
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
          | APP_ACTIONS.SET_ACTIVE_APP_NAME;
        payload: string;
      }
    | { type: APP_ACTIONS.SET_THEME_LIST; payload: ThemeList[] }
    | { type: APP_ACTIONS.SET_LANGUAGES; payload: MenuItemProps[] }
    | { type: APP_ACTIONS.SET_STRIPE_CONFIG; payload: StripeConfig }
    | { type: APP_ACTIONS.SET_OWNER; payload: UserSchema }
    | { type: APP_ACTIONS.SET_STORE_INVENTORY; payload: MerchProps[] }
    | { type: APP_ACTIONS.SET_ACTIVE_MENU | APP_ACTIONS.SET_MENU; payload: MenuProps[] }
    | { type: APP_ACTIONS.SET_LANDING | APP_ACTIONS.SET_PAGE; payload: PageProps }
    | { type: APP_ACTIONS.SET_PAGES; payload: PageProps[] }
    | { type: APP_ACTIONS.SET_STORE; payload: StoreProps }
    | { type: APP_ACTIONS.SET_CALENDAR; payload: CalendarProps }
    | { type: APP_ACTIONS.SET_APP_LIST; payload: AppListProps[] }
    | { type: APP_ACTIONS.SET_NEWSLETTER; payload: NewsletterProps }
    | { type: APP_ACTIONS.SET_MEDIA | APP_ACTIONS.SET_ACTIVE_MEDIA; payload: MediaProps }
    | { type: APP_ACTIONS.SET_ADMIN_IDS; payload: AdminIdProps[] };
}
