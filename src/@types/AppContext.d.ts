declare module "app-context" {
  import { CalendarProps, KeyStringProp, MenuProps, SectionProps } from "app-types";
  import { FormValueProps } from "app-forms";
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
  export interface AppStateProps {
    appList: { [key: string]: any }[];
    isLoading: boolean;
    isOnline: boolean;
    appName: string;
    languageList: KeyStringProp[];
    iconList: KeyStringProp[];
    welcomeMessage: string;
    // theme: string;
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    logo: KeyStringProp;
    media: SectionProps;
    menu: MenuProps[];
    calendar: CalendarProps;
    locale: string;
    themeList: KeyStringProp[];
  }
}
