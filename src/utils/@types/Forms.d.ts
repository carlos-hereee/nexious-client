declare module "app-forms" {
  import { MerchProps } from "services-context";
  import { AppListProps, PageProps } from "app-context";
  import {
    AssetProps,
    CalendarProps,
    KeyStringProp,
    MediaItemProp,
    MediaProps,
    MenuItemProps,
    NewsletterProps,
    StoreProps,
  } from "app-types";

  export interface FormatStoreFormProps {
    store: StoreProps;
    desiredOrder: string[];
  }
  export interface FormatMerchFormProps {
    merch: MerchProps;
    desiredOrder: string[];
  }
  export interface InitAppProps {
    appName: string;
    logo: string;
  }
  export interface LoginValues {
    username: string;
    password: string;
  }
  export interface AuthFormValueProps extends LoginValues {
    // username: string;
    password?: string;
    confirmPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }
  export interface ForgotPasswordValues {
    username: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  export interface MediaFormUpdateProps {
    onCancelClick?: () => void;
    onSubmit?: (key: AppValues) => void;
    media?: MediaItemProp;
  }
  export type FormProps = {
    formId: string;
    initialValues: AppValues;
    labels?: { [key: string]: string | undefined };
    types?: { [key: string]: string | undefined };
    hero?: AssetProps;
    // optional data
    placeholders?: { [key: string]: string | undefined };
    dataList?: { [key: string]: string[] };
    heading?: string;
    fieldHeading: { [key: string]: string | undefined };
    desiredOrder: string[];
    submitLabel?: string;
    additionLabel?: string;
    removalLabel?: string;
    previewLabel?: string;
    groupName?: string;
    canMultiply?: boolean;
    withFileUpload?: boolean;
  };

  export type RegisterFormProps = {
    username: string;
    password: string;
    confirmPassword: string;
  };

  export interface SectionEntryOganizer {
    [key: string]: FormProps;
  }
  export type AppValues =
    | InitAppProps
    | PageProps
    | NewsletterProps
    | MediaProps
    | CalendarProps
    | KeyStringProp
    | { [key: string]: string | boolean }
    | FormData;
  export interface InitPaginateFormProps {
    initialValues: AppValues;
    form: FormProps;
    formId: string;
    withFileUpload?: boolean;
    addEntry?: { [key: string]: FormProps };
    theme?: string;
    previewLabel?: string;
    dataList?: { [key: string]: MenuItemProps[] };
    clearSelection?: { [key: string]: boolean };
    onSubmit?: (key: AppValues) => void;
    onViewPreview?: (key: AppValues) => void;
    schema?: {
      required?: string[];
      unique?: { name: string; list: AppListProps[] }[];
    };
  }

  export interface ReorderFormValueProps {
    values: AppValues;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatPageProps {
    values?: PageProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatNewsletterProps {
    values: NewsletterProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatMediaProps {
    values?: MediaProps;
    media?: MediaItemProp;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface InitValueProps {
    initialValues: AppValues;
    formId: "initApp" | "landingPage" | "medias" | "newsletter";
  }
}
