declare module "app-forms" {
  import { PageProps } from "app-context";
  import { AssetProps, MediaProps, NewsletterProps } from "app-types";

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
  export type FormProps = {
    formId: string;
    initialValues: FormValueProps;
    labels?: { [key: string]: string | undefined };
    types?: { [key: string]: string | undefined };
    hero?: AssetProps;
    // optional data
    placeholders?: { [key: string]: string | undefined };
    heading?: string;
    fieldHeading: { [key: string]: string | undefined };
    desiredOrder?: string[];
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
  export type FormValueProps = {
    [key: string]: string | number | boolean;
  };
  export interface SectionEntryOganizer {
    [key: string]: FormProps;
  }
  export interface InitPaginateFormProps {
    values: FormValueProps;
    form: FormProps;
    formId: string;
    withFileUpload?: boolean;
    addEntries?: SectionEntryOganizer[];
    theme?: string;
    previewLabel?: string;
    dataList?: { [key: string]: { [key: string]: string }[] };
    onSubmit?: (key: FormValueProps) => void;
    onViewPreview?: (key: FormValueProps[]) => void;
    schema?: {
      required?: string[];
      unique?: { name: string; list: string[] }[];
    };
  }

  export interface ReorderFormValueProps {
    values: FormValueProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatLandingPageProps {
    values: PageProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatNewsletterProps {
    values: NewsletterProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface FormatMediaProps {
    values: MediaProps;
    desiredOrder: string[];
    hasEntry?: SectionEntryOganizer;
  }
  export interface InitValueProps {
    form: FormProps;
    initialValues: FormValueProps;
    addEntries?: SectionEntryOganizer;
    onSubmit: (e: FormValueProps) => void;
  }
}
