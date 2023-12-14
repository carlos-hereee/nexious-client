declare module "app-context" {
  import { UserSchema } from "auth-context";
  import { APP_ACTIONS } from "@actions/AppActions";
  import {
    AdminIdProps,
    // AssetProps,
    CalendarProps,
    CallToActionProps,
    MediaProps,
    MenuItemProps,
    MenuProps,
    NewsletterProps,
    SectionProps,
  } from "app-types";

  export interface AppCardProps {
    app: AppListProps;
    owner: UserSchema;
    theme?: string;
    errorMessage?: string;
    handleSeeLive: () => void;
    handleNavigation: (link: string) => void;
  }
  export type ThemeList = {
    name: string;
    value: string;
    label: string;
    uid: string;
    colors: { primary: string; secondary: string; altPrimary: string; altSecondary: string };
    backgroundColors: {
      primary: string;
      secondary: string;
      altPrimary: string;
      altSecondary: string;
    };
  };
  export type StoreProps = {
    name?: string;
    storeId?: string;
    title?: string;
    hero?: string;
    merchendise?: {
      uid: string;
      name: string;
      body: string;
      hero: string;
      cost: number;
      quantity: number;
    }[];
  };
  export interface AppProps {
    appName: string;
    store: StoreProps;
    appId: string;
    adminIds: AdminIdProps[];
    logo: string;
    locale: string;
    languageList: MenuItemProps[];
    pages: PageProps[];
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    welcomeMessage: string;
    appError: string;
    landing: PageProps;
    owner: UserSchema;
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    themeList: ThemeList[];
    iconList: MenuItemProps[];
    calendar: CalendarProps;
  }
  export interface AppListProps {
    appName: string;
    appId: string;
    adminIds: AdminIdProps[];
    logo: string;
    owner: UserSchema;
    menu?: MenuProps[];
    media?: MediaProps;
  }
  export interface PageProps {
    title: string;
    tagline: string;
    body: string;
    hasCta: boolean;
    hasSections: boolean;
    hero: string;
    cta: CallToActionProps[];
    sections: SectionProps[];
    name?: string;
    isStore: boolean;
    uid?: string;
    pageId?: string;
  }
  export type ActiveMenuProps = {
    menu?: MenuProps[];
    appName?: string;
    logo?: string;
    appId?: string;
    media?: MediaProps;
  };
  export type IconListItem = {
    uid: string;
    name: string;
    value: string;
    icon: string;
    label: string;
  };

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
  export interface AppSchema {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    activeLogo: string;
    appList: AppListProps[];
    themeList: ThemeList[];
    iconList: IconListItem[];
    appName: string;
    activeAppName: string;
    appError: string;
    welcomeMessage: string;
    landing?: PageProps;
    pages?: PageProps[];
    appId: string;
    activeAppId: string;
    owner: UserSchema;
    store: StoreProps;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: string;
    activeMedia: MediaProps;
    locale: string;
    calendar: CalendarProps;
    updateAppData: (key: AppProps) => void;
    getAppWithName: (appName: string) => void;
    updateAppList: (appList: AppListProps[]) => void;
    updateActiveAppData: (props: ActiveMenuProps) => void;
    handleMenu: (props: MenuProps, appName: string, appId: string) => void;
  }

  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    values?: AppProps;
    logo?: string;
    media?: MediaProps;
    appName?: string;
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
    | { type: APP_ACTIONS.SET_LANGUAGE_LIST; payload: MenuItemProps[] }
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
