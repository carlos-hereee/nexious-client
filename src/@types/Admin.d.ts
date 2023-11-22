declare module "app-admin" {
  import { MenuProps } from "app-types";
  import { FormProps, FormValueProps, SectionEntryOganizer } from "app-forms";
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
    // landingPageFormOrder: string[];
    formErrors: { initAppFormError: string };
    themeList: { [key: string]: string }[];
    calendarThemeList: { [key: string]: string }[];
    mediaList: { [key: string]: string }[];
    languageList: { [key: string]: string }[];
    appLogo: { [key: string]: string };
    // appMenu: MenuProps[];
    appName: string;
    sectionEntries: SectionEntryOganizer;
  }

  export interface AdminSchema {
    isLoading: boolean;
    formErrors: { initAppFormError: string };
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
    calendarThemeList: { [key: string]: string }[];
    themeList: { [key: string]: string }[];
    mediaList: { [key: string]: string }[];
    languageList: { [key: string]: string }[];
    appLogo: { [key: string]: string };
    // appMenu: MenuProps[];
    appName: string;
    sectionEntries: SectionEntryOganizer;
    initApp: (values: FormValueProps) => void;
    editApp: (values: FormValueProps, appId: string) => void;
    editAppName: (values: FormValueProps, appId: string) => void;
    deleteApp: (appId: string) => void;
    updateAppMenu: (menu: MenuProps[]) => void;
    updateLanguage: (locale: string, appName: string) => void;
    editLandingPage: (values: FormValueProps, appId: string) => void;
    editNewsletter: (values: FormValueProps, appId: string) => void;
    editSocialMedia: (values: FormValueProps, appId: string) => void;
    editCalendar: (values: FormValueProps, appId: string) => void;
    editLanguage: (values: FormValueProps, appId: string) => void;
  }
}
