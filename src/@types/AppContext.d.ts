declare module "app-context" {
  import { CalendarProps, MenuProps, SectionProps } from "app-types";
  import { FormValueProps } from "app-forms";
  // app context schema
  export interface AppSchema {
    // auth schema
    isLoading: boolean;
    apps: { [key: string]: any }[];
    appName: string;
    welcomeMessage: string;
    theme: string;
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    media: SectionProps;
    appMenu: MenuProps[];
    menu: MenuProps[];
    logo: { [key: string]: string };
    calendar: CalendarProps;
    setTheme: (key: string) => void;
    getAppList: () => void;
    updateAppData: (key: FormValueProps) => void;
    getAppWithName: (appName: string) => void;
    updateMenu: (menu: MenuProps[]) => void;
  }
  export interface AppStateProps {
    apps: { [key: string]: any }[];
    isLoading: boolean;
    appName: string;
    welcomeMessage: string;
    theme: string;
    // themeList: { name: string; value: string; themeId: string; uid?: string }[];
    landing: any;
    appId: string;
    ownerId: string;
    adminIds: string[];
    newsletter: SectionProps;
    media: SectionProps;
    logo: { [key: string]: string };
    appMenu: MenuProps[];
    menu: MenuProps[];
    calendar: CalendarProps;
  }
}
