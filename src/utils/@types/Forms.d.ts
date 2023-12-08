declare module "app-forms" {
  import { AppListProps, PageProps } from "app-context";
  import {
    AssetProps,
    CalendarProps,
    KeyStringProp,
    MediaItemProp,
    MediaProps,
    MenuItemProps,
    NewsletterProps,
  } from "app-types";

  export interface InitAppProps {
    appName: string;
    logo: string;
  }
  export interface AuthFormValueProps {
    username: string;
    password?: string;
    confirmPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }
  export interface ForgotPasswordFormProps {
    username: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  export interface MediaFormUpdateProps {
    onCancelClick?: () => void;
    onSubmit?: (key: PreviewValueProps) => void;
    media?: MediaItemProp;
  }
  export type FormProps = {
    formId: string;
    initialValues: PreviewValueProps;
    labels?: { [key: string]: string | undefined };
    types?: { [key: string]: string | undefined };
    hero?: AssetProps;
    // optional data
    placeholders?: { [key: string]: string | undefined };
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
  export type PreviewValueProps =
    | InitAppProps
    | PageProps
    | NewsletterProps
    | MediaProps
    | CalendarProps
    | KeyStringProp
    | { [key: string]: string | boolean }
    | FormData;
  export interface InitPaginateFormProps {
    initialValues: PreviewValueProps;
    form: FormProps;
    formId: string;
    withFileUpload?: boolean;
    addEntry?: { [key: string]: FormProps };
    theme?: string;
    previewLabel?: string;
    dataList?: { [key: string]: MenuItemProps[] };
    clearSelection?: { [key: string]: boolean };
    onSubmit?: (key: PreviewValueProps) => void;
    onViewPreview?: (key: PreviewValueProps) => void;
    schema?: {
      required?: string[];
      unique?: { name: string; list: AppListProps[] }[];
    };
  }

  export interface ReorderFormValueProps {
    values: PreviewValueProps;
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
    desiredOrder?: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatMediaProps {
    values?: MediaProps;
    media?: MediaItemProp;
    desiredOrder?: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface InitValueProps {
    initialValues: PreviewValueProps;
    formId: "initApp" | "landingPage" | "medias" | "newsletter";
  }
}
