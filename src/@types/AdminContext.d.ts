declare module "app-admin" {
  import { MenuItemProps } from "app-types";
  import { ADMIN_ACTIONS } from "@app/utils/types/AdminActions";
  import { AppListProps, AppProps } from "app-context";
  import { UserSchema } from "auth-context";
  import { FormProps, FormValueProps, SectionEntryOganizer } from "app-forms";

  export type AdminFormErrors = {
    initAppFormError?: string;
  };
  export interface AppAssetProps {
    user?: UserSchema;
    app?: AppProps;
    appList?: AppListProps[];
  }
  export interface AdminStateProps {
    isLoading: boolean;
    initAppForm: FormProps;
    pagesForm: FormProps;
    calendarForm: FormProps;
    sectionForm: FormProps;
    landingForm: FormProps;
    heroForm: FormProps;
    languageForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    ctaForm: FormProps;
    mediaEntryForm: FormProps;
    formErrors: AdminFormErrors;
    themeList: MenuItemProps[];
    calendarThemeList: MenuItemProps[];
    mediaList: MenuItemProps[];
    languageList: MenuItemProps[];
    sectionEntries: SectionEntryOganizer;
  }

  export interface AdminSchema {
    isLoading: boolean;
    formErrors: AdminFormErrors;
    initAppForm: FormProps;
    pagesForm: FormProps;
    sectionForm: FormProps;
    calendarForm: FormProps;
    landingForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    heroForm: FormProps;
    ctaForm: FormProps;
    mediaEntryForm: FormProps;
    languageForm: FormProps;
    calendarThemeList: MenuItemProps[];
    themeList: MenuItemProps[];
    mediaList: MenuItemProps[];
    languageList: MenuItemProps[];
    // appLogo: MenuItemProps;
    // // appMenu: MenuProps[];
    // appName: string;
    sectionEntries: SectionEntryOganizer;
    initApp: (values: FormValueProps) => void;
    editApp: (values: FormValueProps, appId: string) => void;
    editAppName: (values: FormValueProps, appId: string) => void;
    deleteApp: (appId: string) => void;
    // updateAppMenu: (menu: MenuProps[]) => void;
    updateLanguage: (locale: string, appName: string) => void;
    editLandingPage: (values: FormValueProps, appId: string) => void;
    editNewsletter: (values: FormValueProps, appId: string) => void;
    editSocialMedia: (values: FormValueProps, appId: string) => void;
    editCalendar: (values: FormValueProps, appId: string) => void;
    editLanguage: (values: FormValueProps, appId: string) => void;
  }
  export interface AdminReducerProps {
    handleAppAssets: (key: AppAssetProps) => void;
  }
  export type AdminActionProps =
    | {
        type: ADMIN_ACTIONS.IS_LOADING;
        payload: boolean;
      }
    | {
        type: ADMIN_ACTIONS.SET_FORM_ERRORS;
        payload: AdminFormErrors;
      };
}
