declare module "app-forms" {
  // import { AppDispatchProps } from "reducer-dispatch-props";

  export interface LoginFormProps {
    username: string;
    password: string;
  }
  export type FormProps = {
    formId: string;
    initialValues: FormValueProps;
    labels?: { [key: string]: string | undefined };
    types?: { [key: string]: string | undefined };
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
  };
  export type FormValueProps = {
    [key: string]: unknown;
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
  // export type UpdateAppProps = {
  //   dispatch: React.Dispatch<AppDispatchProps>;
  //   values: FormValueProps;
  // };
  export type BuildAppProps = {
    dispatch: React.Dispatch<any>;
    values: FormValueProps;
    handleAppAssets: (key: FormValueProps) => void;
  };
  export type DeleteAppProps = {
    dispatch: React.Dispatch<any>;
    appId: string;
    handleAppAssets: (key: FormValueProps) => void;
  };
  export type EditAppProps = {
    dispatch: React.Dispatch<any>;
    values: FormValueProps;
    appId: string;
    handleAppAssets: (key: FormValueProps) => void;
  };
  export type UpdateLanguageProps = {
    dispatch: React.Dispatch<any>;
    locale: string;
    appName: string;
    handleAppAssets: (key: FormValueProps) => void;
  };
  export type GetAppNameReducerProps = {
    dispatch: React.Dispatch<any>;
    appName: string;
    updateAppData: (key: FormValueProps) => void;
  };
  export interface ReorderFormValueProps {
    values: FormValueProps;
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
