declare module "app-admin" {
  import { MenuProps } from "app-types";
  import { FormProps, FormValueProps } from "app-forms";
  export interface AdminStateProps {
    isLoading: boolean;
    initAppForm: FormProps;
    pagesForm: FormProps;
    sectionForm: FormProps;
    landingPageForm: FormProps;
    heroForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    ctaForm: FormProps;
    // landingPageFormOrder: string[];
    formErrors: { initAppFormError: string };
    themeList: { [key: string]: string }[];
    languageList: { [key: string]: string }[];
    appLogo: { [key: string]: string };
    appMenu: MenuProps[];
    appName: string;
    sectionEntryOrganizer: {
      name: string;
      form: FormProps;
      canMultiply: boolean;
      skipIfFalse: string;
    }[];
  }

  export interface AdminSchema {
    isLoading: boolean;
    formErrors: { initAppFormError: string };
    initAppForm: FormProps;
    pagesForm: FormProps;
    sectionForm: FormProps;
    landingPageForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    heroForm: FormProps;
    ctaForm: FormProps;
    // landingPageFormOrder:;
    themeList: { [key: string]: string }[];
    languageList: { [key: string]: string }[];
    appLogo: { [key: string]: string };
    appMenu: MenuProps[];
    appName: string;
    sectionEntryOrganizer: {
      name: string;
      form: FormProps;
      canMultiply: boolean;
      skipIfFalse: string;
    }[];
    initApp: (values: FormValueProps) => void;
    editApp: (values: FormValueProps, appId: string) => void;
    editAppName: (values: FormValueProps, appId: string) => void;
    deleteApp: (appId: string) => void;
    updateAppMenu: (menu: MenuProps[]) => void;
    updateLanguage: (locale: string, appName: string) => void;
    editLandingPage: (values: FormValueProps, appId: string) => void;
    editNewsletter: (values: FormValueProps, appId: string) => void;
    editSocialMedia: (values: FormValueProps, appId: string) => void;
  }
}
