declare module "app-admin" {
  import { MenuItemProps } from "app-types";
  import { ADMIN_ACTIONS } from "@actions/AdminActions";
  import { AppListProps, AppProps } from "app-context";
  import { UserSchema } from "auth-context";
  import { FormProps, PreviewValueProps, SectionEntryOganizer } from "app-forms";

  export type AdminFormErrors = {
    initAppFormError?: string;
    addMerchFormError?: string;
    buildAppFormError?: string;
    updateStoreFormError?: string;
  };
  export type FORM_STATUS = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

  export interface AppAssetProps {
    user?: UserSchema;
    app?: AppProps;
    appList?: AppListProps[];
  }
  export type OnclickProps = {
    onCancelClick: () => void;
  };
  export interface AdminStateProps {
    isLoading: boolean;
    formStatus: FORM_STATUS;
    initAppForm: FormProps;
    pagesForm: FormProps;
    calendarForm: FormProps;
    sectionForm: FormProps;
    landingForm: FormProps;
    heroForm: FormProps;
    languageForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    merchForm: FormProps;
    ctaForm: FormProps;
    storeForm: FormProps;
    mediaEntryForm: FormProps;
    formErrors: AdminFormErrors;
    themeList: MenuItemProps[];
    calendarThemeList: MenuItemProps[];
    mediaList: MenuItemProps[];
    languageList: MenuItemProps[];
    sectionEntries: SectionEntryOganizer;
  }

  export interface AdminSchema extends AdminStateProps {
    setFormStatus: (status: FORM_STATUS) => void;
    initApp: (values: PreviewValueProps) => void;
    editAppName: (values: PreviewValueProps, appId: string) => void;
    addPage: (values: PreviewValueProps, appId: string) => void;
    addMedia: (values: PreviewValueProps, appId: string) => void;
    editLandingPage: (values: PreviewValueProps, appId: string) => void;
    editNewsletter: (values: PreviewValueProps, appId: string) => void;
    editSocialMedia: (values: PreviewValueProps, appId: string) => void;
    editCalendar: (values: PreviewValueProps, appId: string) => void;
    editPage: (values: PreviewValueProps, appId: string, name?: string) => void;
    deleteApp: (appId: string) => void;
    deletePage: (appId: string, pageId: string) => void;
    deleteMedia: (appId: string, name: string) => void;
    listBucket: (appId: string) => void;
    addStore: (values: PreviewValueProps, appId: string) => void;
    editStore: (values: PreviewValueProps, appId: string) => void;
    addMerch: (values: PreviewValueProps, appId: string) => void;
  }
  export interface AdminDisptachProps {
    dispatch: React.Dispatch<AdminActionProps>;
    handleAppAssets?: (key: AppAssetProps) => void;
    setFormStatus?: (key: FORM_STATUS) => void;
    appId?: string;
    name?: string;
    pageId?: string;
    status?: FORM_STATUS;
    values?: PreviewValueProps;
  }
  export type AdminActionProps =
    | { type: ADMIN_ACTIONS.IS_LOADING; payload: boolean }
    | { type: ADMIN_ACTIONS.SET_FORM_STATUS; payload: FORM_STATUS }
    | { type: ADMIN_ACTIONS.SET_FORM_ERRORS; payload: AdminFormErrors };
}
