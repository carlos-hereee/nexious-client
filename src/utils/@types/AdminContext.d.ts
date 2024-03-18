declare module "app-admin" {
  import { MenuItemProps, PageProps, StoreProps } from "app-types";
  import { ADMIN_ACTIONS } from "@actions/AdminActions";
  import { AppListProps, AppProps, StripeConfig } from "app-context";
  import { UserSchema } from "auth-context";
  import { FormProps, AppValues, SectionEntryOganizer } from "app-forms";

  export type AdminFormErrors = {
    initAppFormError?: string;
    addMerchFormError?: string;
    buildAppFormError?: string;
    updateStoreFormError?: string;
    updateAppDetailsFormError?: string;
  };
  export type FORM_STATUS = "IDLE" | "LOADING" | "ERROR" | "SUCCESS";

  export interface AppAssets {
    user?: UserSchema;
    store?: StoreProps;
    app?: AppProps;
    page?: PageProps;
    appList?: AppListProps[];
  }
  export type OnclickProps = {
    onCancelClick?: () => void;
    onClick?: () => void;
    data?: { title: string; body: string };
    message?: string;
  };
  export interface EditPageValues {
    values?: PageProps;
    appId: string;
    pageId: string;
  }
  export interface AdminStateProps {
    isLoading: boolean;
    formStatus: FORM_STATUS;
    initAppForm: FormProps;
    appDetailsForm: FormProps;
    pagesForm: FormProps;
    calendarForm: FormProps;
    sectionForm: FormProps;
    landingForm: FormProps;
    stripeForm: FormProps;
    heroForm: FormProps;
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
    themeList: ThemeList[];
    iconList: IconListItem[];
  }

  export interface AdminSchema extends AdminStateProps {
    setFormStatus: (status: FORM_STATUS) => void;
    initApp: (values: AppValues) => void;
    // stripe account
    getAccount: (accountId: string) => void;
    updateAccount: (config: StripeConfig) => void;
    editAppDetails: (values: AppValues, appId: string) => void;
    editAppName: (values: AppValues, appId: string) => void;
    addPage: (values: AppValues, appId: string) => void;
    addMedia: (values: AppValues, appId: string) => void;
    editLandingPage: (values: AppValues, appId: string) => void;
    editNewsletter: (values: AppValues, appId: string) => void;
    editSocialMedia: (values: AppValues, appId: string) => void;
    editCalendar: (values: AppValues, appId: string) => void;
    editPage: ({ values, pageId, appId }: EditPageValues) => void;
    deleteApp: (appId: string) => void;
    deleteStore: (appId: string) => void;
    deleteMerchItem: (appId: string, merchId: string) => void;
    deletePage: ({ appId, pageId }: EditPageValues) => void;
    deleteMedia: (appId: string, name: string) => void;
    listBucket: (appId: string) => void;
    addStore: (values: AppValues, appId: string) => void;
    editStore: (values: AppValues, appId: string) => void;
    editMerch: (values: AppValues, appId: string, merhId: string) => void;
    addMerch: (values: AppValues, appId: string) => void;
  }
  export interface AdminDisptachProps {
    dispatch: React.Dispatch<AdminActionProps>;
    handleAppAssets?: (key: AppAssets) => void;
    setFormStatus?: (key: FORM_STATUS) => void;
    updateStripeConfig?: (key: StripeConfig) => void;
    appId?: string;
    name?: string;
    pageId?: string;
    accountId?: string;
    config?: StripeConfig;
    merchId?: string;
    status?: FORM_STATUS;
    values?: AppValues;
  }
  export type AdminActionProps =
    | { type: ADMIN_ACTIONS.IS_LOADING; payload: boolean }
    | { type: ADMIN_ACTIONS.SET_FORM_STATUS; payload: FORM_STATUS }
    | { type: ADMIN_ACTIONS.SET_FORM_ERRORS; payload: AdminFormErrors };
}
