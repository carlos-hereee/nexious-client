declare module "app-context" {
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
    landing: LandingProps;
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
  export interface LandingProps {
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
    landing: LandingProps;
    appId: string;
    ownerId: string;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: SectionProps;
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
    landing: LandingProps;
    appId: string;
    ownerId: string;
    adminIds: AdminIdProps[];
    newsletter: NewsletterProps;
    media: SectionProps;
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
}
