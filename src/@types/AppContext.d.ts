declare module "app-context" {
  import { APP_ACTIONS } from "@app/utils/types/AppActions";
  import {
    AdminIdProps,
    AssetProps,
    CalendarProps,
    CallToActionProps,
    KeyStringProp,
    MediaProps,
    MenuItemProps,
    MenuProps,
    NewsletterProps,
    SectionProps,
  } from "app-types";
  import { FormValueProps } from "app-forms";

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
    ownerId: string;
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
  export interface AppStateProps {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    appList: AppListProps[];
    appName: string;
    welcomeMessage: string;
    landing: PageProps;
    appId: string;
    ownerId: string;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: AssetProps;
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
    appList: AppListProps[];
    appName: string;
    welcomeMessage: string;
    // theme: string;
    landing: PageProps;
    appId: string;
    ownerId: string;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: MediaProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: AssetProps;
    themeList: MenuItemProps[];
    languageList: KeyStringProp[];
    iconList: KeyStringProp[];
    locale: string;
    calendar: CalendarProps;
    updateAppData: (key: FormValueProps) => void;
    getAppWithName: (appName: string) => void;
    updateMenu: (menu: MenuProps[]) => void;
    updateAppList: (appList: AppListProps[]) => void;
  }
  // export interface AppProviderProps {
  //   updateAppData: (key: FormValueProps) => void;
  //   getAppWithName: (appName: string) => void;
  //   updateMenu: (menu: MenuProps[]) => void;
  //   updateAppList: (appList: { [key: string]: any }[]) => void;
  // }
  export interface AppDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
  }
  export interface AppFormDispatchProps {
    dispatch: React.Dispatch<AppActionProps>;
    values: AppProps;
    menu?: MenuProps[];
  }

  export type AppActionProps =
    | {
        type: APP_ACTIONS.IS_LOADING | APP_ACTIONS.COOMING_SOON;
        payload: boolean;
      }
    | {
        type:
          | APP_ACTIONS.SET_APP_ID
          | APP_ACTIONS.SET_OWNER_ID
          | APP_ACTIONS.SET_APP_NAME
          | APP_ACTIONS.SET_LOCALE;
        payload: string;
      }
    | {
        type: APP_ACTIONS.SET_THEME_LIST | APP_ACTIONS.SET_LANGUAGE_LIST;
        payload: MenuItemProps[];
      }
    | {
        type: APP_ACTIONS.SET_ACTIVE_MENU | APP_ACTIONS.SET_MENU;
        payload: MenuProps[];
      }
    | {
        type: APP_ACTIONS.SET_LANDING;
        payload: PageProps;
      }
    | {
        type: APP_ACTIONS.SET_APP_LOGO;
        payload: AssetProps;
      }
    | {
        type: APP_ACTIONS.SET_CALENDAR;
        payload: CalendarProps;
      }
    | {
        type: APP_ACTIONS.SET_APP_LIST;
        payload: AppListProps[];
      }
    | {
        type: APP_ACTIONS.SET_NEWSLETTER;
        payload: NewsletterProps;
      }
    | {
        type: APP_ACTIONS.SET_MEDIA;
        payload: MediaProps;
      }
    | {
        type: APP_ACTIONS.SET_ADMIN_IDS;
        payload: AdminIdProps[];
      };
}
