declare module "app-forms" {
  import { MerchProps } from "services-context";
  import { AppListProps } from "app-context";
  import {
    AssetProps,
    CalendarProps,
    StringObjProp,
    MediaItemProp,
    MediaProps,
    MenuProp,
    NewsletterProps,
    StoreProps,
    PageProps,
    StringBooleanObjProp,
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
  export type FormValueData = { values: AppValues; appId: string };
  export interface InitPaginateFormProps {
    initialValues: AppValues;
    form: FormProps;
    formId: string;
    withFileUpload?: boolean;
    addEntry?: { [key: string]: FormProps };
    theme?: string;
    previewLabel?: string;
    dataList?: { [key: string]: MenuProp[] };
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
    page?: PageProps;
    merch?: MerchProps;
    addEntry: SectionEntryOganizer;
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
  export type AppValues =
    | InitAppProps
    | PageProps
    | NewsletterProps
    | MediaProps
    | MenuProp
    | CalendarProps
    | StringObjProp
    | StringBooleanObjProp;

  export interface FormatInitialFormValues<V> {
    values?: V;
    landing?: PageProps;
    merch?: MerchProps;
    page?: PageProps;
    menu?: MenuProp;
    desiredOrder: string[];
  }
  export type FormatAppMenuValue<I = MenuProp> = (data: FormatInitialFormValues<I>) => StringObjProp;
  export type FormatFormValue<I = StringBooleanObjProp> = (data: FormatInitialFormValues<I>) => StringBooleanObjProp;
}
