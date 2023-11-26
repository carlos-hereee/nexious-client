declare module "app-context" {
  import { UserSchema } from "auth-context";
  import { APP_ACTIONS } from "@app/utils/actions/AppActions";
  import {
    AdminIdProps,
    AssetProps,
    CalendarProps,
    CallToActionProps,
    MediaProps,
    MenuItemProps,
    MenuProps,
    NewsletterProps,
    SectionProps,
  } from "app-types";

  export interface AppProps {
    appName: string;
    appId: string;
    adminIds: AdminIdProps[];
    logo: AssetProps;
    locale: string;
    languageList: MenuItemProps[];
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    welcomeMessage: string;
    landing: PageProps;
    owner: UserSchema;
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    themeList: MenuItemProps[];
    iconList: MenuItemProps[];
    calendar: CalendarProps;
  }
  export interface AppListProps {
    appName: string;
    appId: string;
    adminIds: AdminIdProps[];
    logo: AssetProps;
  }
  export interface PageProps {
    title: string;
    tagline: string;
    body: string;
    hasCta: boolean;
    hasSections: boolean;
    hero: AssetProps;
    cta: CallToActionProps[];
    sections: SectionProps[];
  }
  export type ActiveMenuProps = {
    menu: MenuProps[];
    appName: string;
    logo: AssetProps;
  };
  export interface AppStateProps {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    appName: string;
    activeAppName: string;
    welcomeMessage: string;
    landing?: PageProps;
    appId: string;
    owner: UserSchema;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    footerMedia: MediaProps;
    logo: AssetProps;
    activeLogo: AssetProps;
    themeList: MenuItemProps[];
    languageList: MenuItemProps[];
    iconList: MenuItemProps[];
    locale: string;
    calendar: CalendarProps;
  }
  // app context schema
  export interface AppSchema {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    activeLogo: AssetProps;
    appList: AppListProps[];
    appName: string;
    activeAppName: string;
    welcomeMessage: string;
    // theme: string;
    landing?: PageProps;
    appId: string;
    owner: UserSchema;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: MediaProps;
    footerMedia: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: AssetProps;
    themeList: MenuItemProps[];
    languageList: MenuItemProps[];
    iconList: MenuItemProps[];
    locale: string;
    calendar: CalendarProps;
    updateAppData: (key: AppProps) => void;
    getAppWithName: (appName: string) => void;
    // updateMenu: (menu: MenuProps[]) => void;
    updateAppList: (appList: AppListProps[]) => void;
    updateActiveMenu: (props: ActiveMenuProps) => void;
  }

  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    values?: AppProps;
    logo?: AssetProps;
    appName?: string;
    appId?: string;
    menu?: MenuProps[];
    updateAppData?: (a: AppProps) => void;
  }

  export type AppActionProps =
    | { type: APP_ACTIONS.IS_LOADING | APP_ACTIONS.COOMING_SOON; payload: boolean }
    | {
        type:
          | APP_ACTIONS.SET_APP_ID
          | APP_ACTIONS.SET_APP_NAME
          | APP_ACTIONS.SET_LOCALE
          | APP_ACTIONS.SET_ACTIVE_APP_NAME;
        payload: string;
      }
    | { type: APP_ACTIONS.SET_THEME_LIST | APP_ACTIONS.SET_LANGUAGE_LIST; payload: MenuItemProps[] }
    | { type: APP_ACTIONS.SET_OWNER; payload: UserSchema }
    | { type: APP_ACTIONS.SET_ACTIVE_MENU | APP_ACTIONS.SET_MENU; payload: MenuProps[] }
    | { type: APP_ACTIONS.SET_LANDING; payload: PageProps }
    | { type: APP_ACTIONS.SET_APP_LOGO | APP_ACTIONS.SET_ACTIVE_LOGO; payload: AssetProps }
    | { type: APP_ACTIONS.SET_CALENDAR; payload: CalendarProps }
    | { type: APP_ACTIONS.SET_APP_LIST; payload: AppListProps[] }
    | { type: APP_ACTIONS.SET_NEWSLETTER; payload: NewsletterProps }
    | { type: APP_ACTIONS.SET_MEDIA; payload: MediaProps }
    | { type: APP_ACTIONS.SET_ADMIN_IDS; payload: AdminIdProps[] };
}
