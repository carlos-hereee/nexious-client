declare module "app-context" {
  import { UserSchema } from "auth-context";
  import { AppAssetProps } from "app-admin";
  import { APP_ACTIONS } from "@actions/AppActions";
  import {
    AdminIdProps,
    AppListProps,
    CalendarProps,
    MediaProps,
    MenuItemProps,
    MenuProps,
    NewsletterProps,
  } from "app-types";

  // export interface UpdateAppsProps {
  //   appList?: AppListProps[];
  //   app?: AppProps;
  // }
  export interface AppCardProps {
    app: AppListProps;
    owner: UserSchema;
    theme?: string;
    errorMessage?: string;
    handleSeeLive: () => void;
    handleNavigation: (link: string) => void;
  }

  export interface AppStateProps {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    themeList: ThemeList[];
    iconList: IconListItem[];
    appError: string;
    appName: string;
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
    pages?: PageProps[];
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
  }
  // app context schema
  export interface AppSchema extends AppStateProps {
    updateAppData: (props: AppAssetProps) => void;
    getAppWithName: (appName: string) => void;
    setLoading: (isLoading: boolean) => void;
    updateActiveAppData: (props: ActiveMenuProps) => void;
    handleMenu: (props: MenuProps, appName: string, appId: string) => void;
  }

  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    app?: AppProps;
    appList?: AppListProps[];
    logo?: string;
    media?: MediaProps;
    appName?: string;
    isLoading?: boolean;
    appId?: string;
    menu?: MenuProps[];
    updateAppData?: (a: AppProps) => void;
    updateActiveAppData?: (a: ActiveMenuProps) => void;
  }

  export type AppActionProps =
    | { type: APP_ACTIONS.IS_LOADING | APP_ACTIONS.COOMING_SOON; payload: boolean }
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
    | { type: APP_ACTIONS.SET_OWNER; payload: UserSchema }
    | { type: APP_ACTIONS.SET_ACTIVE_MENU | APP_ACTIONS.SET_MENU; payload: MenuProps[] }
    | { type: APP_ACTIONS.SET_LANDING; payload: PageProps }
    | { type: APP_ACTIONS.SET_PAGES; payload: PageProps[] }
    | { type: APP_ACTIONS.SET_STORE; payload: StoreProps }
    | { type: APP_ACTIONS.SET_CALENDAR; payload: CalendarProps }
    | { type: APP_ACTIONS.SET_APP_LIST; payload: AppListProps[] }
    | { type: APP_ACTIONS.SET_NEWSLETTER; payload: NewsletterProps }
    | { type: APP_ACTIONS.SET_MEDIA | APP_ACTIONS.SET_ACTIVE_MEDIA; payload: MediaProps }
    | { type: APP_ACTIONS.SET_ADMIN_IDS; payload: AdminIdProps[] };
}
