declare module "app-admin" {
  import { OrderSchema, StoreOrderUpdate } from "store-context";
  import { MenuItemProp, PageProps, StoreProps, StringObjProp } from "app-types";
  import { ADMIN_ACTIONS } from "@actions/AdminActions";
  import { AppListProps, AppProps, StripeConfig } from "app-context";
  import { ISubscription, UserSchema } from "auth-context";
  import { FormProps, AppValues, SectionEntryOganizer, FormValueData } from "app-forms";

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
    account?: StripeConfig;
    page?: PageProps;
    appList?: AppListProps[];
    platformTiers?: ISubscription[];
  }
  export type OnclickProps = {
    onCancelClick?: () => void;
    onClick?: () => void;
    data?: { title: string; body: string };
    message?: string;
  };
  export interface MediaValues {
    appId: string;
    name: string;
  }
  export interface EditPageValues {
    values?: PageProps;
    appId: string;
    pageId: string;
  }
  export interface WebhookSchema {
    id: string;
    object: string;
    api_version: null;
    application: null;
    created: number;
    description: null;
    enabled_events: string[];
    livemode: false;
    metadata: { [key: string]: string };
    status: string;
    url: string;
  }
  export interface AdminStateProps {
    isLoading: boolean;
    formStatus: FORM_STATUS;
    initAppForm: FormProps;
    appMenuForm: FormProps;
    appDetailsForm: FormProps;
    pagesForm: FormProps;
    calendarForm: FormProps;
    sectionForm: FormProps;
    landingForm: FormProps;
    subscriptionForm: FormProps;
    stripeForm: FormProps;
    heroForm: FormProps;
    newsletterForm: FormProps;
    socialMediaForm: FormProps;
    merchForm: FormProps;
    ctaForm: FormProps;
    storeForm: FormProps;
    mediaEntryForm: FormProps;
    calendarBookingForm: FormProps;
    formErrors: AdminFormErrors;
    themeList: MenuItemProp[];
    calendarThemeList: MenuItemProp[];
    mediaList: MenuItemProp[];
    languageList: MenuItemProp[];
    sectionEntries: SectionEntryOganizer;
    iconList: MenuItemProp[];
    webhooks?: WebhookSchema[];
  }

  export interface AdminSchema extends AdminStateProps {
    setFormStatus: (status: FORM_STATUS) => void;
    initApp: (values: AppValues) => void;

    // updateAccount: (config: StripeConfig) => void;
    editAppDetails: (values: AppValues, appId: string) => void;
    editAppName: (values: AppValues, appId: string) => void;
    addPage: (values: AppValues, appId: string) => void;
    addMedia: (values: AppValues, appId: string) => void;
    editLandingPage: (values: AppValues, appId: string) => void;
    editNewsletter: (values: AppValues, appId: string) => void;
    editSocialMedia: (values: AppValues, appId: string) => void;
    editPage: ({ values, pageId, appId }: EditPageValues) => void;
    deleteApp: (appId: string) => void;
    deleteStore: (appId: string) => void;
    deleteMerchItem: (appId: string, merchId: string) => void;
    deletePage: ({ appId, pageId }: EditPageValues) => void;
    deleteMedia: ({ appId, name }: { appId: string; name: string }) => void;
    // listBucket: (appId: string) => void;
    addStore: (values: AppValues, appId: string) => void;
    // calendar
    editCalendar: (data: FormValueData) => void;
    createCalendar: (data: FormValueData) => void;
    editStore: (values: AppValues, appId: string) => void;
    editMerch: (values: AppValues, appId: string, merhId: string) => void;
    addMerch: (values: AppValues, appId: string) => void;
    // app data
    deleteMenuItem: (appId: string, menuId: string) => void;
    getWebhooks: () => void;
    editMenuItem: (appId: string, menuId: string, values: StringObjProp) => void;
    handleOrderClick: (order: StoreOrderUpdate) => void;
  }
  export interface AdminDisptachProps {
    dispatch: React.Dispatch<AdminActionProps>;
    handleAppAssets?: (key: AppAssets) => void;
    setFormStatus?: (key: FORM_STATUS) => void;
    updateStripeConfig?: (key: StripeConfig) => void;
    appId?: string;
    name?: string;
    option?: string;
    from?: OrderOptions;
    order?: OrderSchema;
    pageId?: string;
    uid?: string;
    accountId?: string;
    config?: StripeConfig;
    merchId?: string;
    status?: FORM_STATUS;
    values?: AppValues;
  }
  export type AdminActionProps =
    | { type: ADMIN_ACTIONS.IS_LOADING; payload: boolean }
    | { type: ADMIN_ACTIONS.SET_FORM_STATUS; payload: FORM_STATUS }
    | { type: ADMIN_ACTIONS.SET_WEBHOOKS; payload: WebhookSchema[] }
    | { type: ADMIN_ACTIONS.SET_FORM_ERRORS; payload: AdminFormErrors };
}
