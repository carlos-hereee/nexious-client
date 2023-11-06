declare module "app-context" {
  import { CalendarProps, MenuProps, SectionProps } from "app-types";
  import { FormValueProps } from "app-forms";
  // app context schema
  export interface AppSchema {
    // auth schema
    isLoading: boolean;
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
    logo: { [key: string]: string };
    themeList: { [key: string]: string }[];
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
    appName: string;
    welcomeMessage: string;
    // theme: string;
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    media: SectionProps;
    logo: { [key: string]: string };
    menu: MenuProps[];
    calendar: CalendarProps;
    locale: string;
    themeList: { [key: string]: string }[];
  }
}
