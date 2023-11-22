declare module "app-context" {
  import { AssetProps, CalendarProps, KeyStringProp, MenuProps, SectionProps } from "app-types";
  import { FormValueProps } from "app-forms";

  export interface AppProps {
    appName: string;
    logo: AssetProps;
  }
  export interface LandingProps {}
  export interface AppStateProps {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    appList: { [key: string]: any }[];
    appName: string;
    welcomeMessage: string;
    // theme: string;
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    media: SectionProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: KeyStringProp;
    themeList: KeyStringProp[];
    languageList: KeyStringProp[];
    iconList: KeyStringProp[];
    locale: string;
    calendar: CalendarProps;
  }
  // app context schema
  export interface AppSchema {
    // auth schema
    isLoading: boolean;
    isOnline: boolean;
    appList: { [key: string]: any }[];
    appName: string;
    welcomeMessage: string;
    // theme: string;
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    media: SectionProps;
    menu: MenuProps[];
    activeMenu: MenuProps[];
    logo: KeyStringProp;
    themeList: KeyStringProp[];
    languageList: KeyStringProp[];
    iconList: KeyStringProp[];
    locale: string;
    calendar: CalendarProps;
    updateAppData: (key: FormValueProps) => void;
    getAppWithName: (appName: string) => void;
    updateMenu: (menu: MenuProps[]) => void;
    updateAppList: (appList: { [key: string]: any }[]) => void;
  }
  // export interface AppProviderProps {
  //   updateAppData: (key: FormValueProps) => void;
  //   getAppWithName: (appName: string) => void;
  //   updateMenu: (menu: MenuProps[]) => void;
  //   updateAppList: (appList: { [key: string]: any }[]) => void;
  // }
}
