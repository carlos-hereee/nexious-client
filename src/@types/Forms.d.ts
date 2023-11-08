declare module "app-forms" {
  export interface LoginFormProps {
    username: string;
    password: string;
  }
  export type FormProps = {
    heading: string;
    formId?: string;
    initialValues: { [key: string]: any };
    // optional data
    labels: { [key: string]: string | undefined };
    placeholders: { [key: string]: string | undefined };
    types: { [key: string]: string | undefined };
    fieldHeading: { [key: string]: string | undefined };
    desiredOrder?: string[];
    submitLabel?: string;
    additionLabel?: string;
    removalLabel?: string;
    previewLabel?: string;
    canMultiply?: boolean;
    withFileUpload?: boolean;
  };

  export type RegisterFormProps = {
    username: string;
    password: string;
  };
  export type FormValueProps = {
    [key: string]: any;
  };
  export interface AddEntryProps {
    name: string;
    form: FormProps;
    canMultiply?: boolean;
    skipIfFalse?: string;
  }
  export interface InitPaginateFormProps {
    values: FormValueProps;
    form: FormProps;
    formId: string;
    withFileUpload?: boolean;
    addEntries?: AddEntryProps[];
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
  export type UpdateAppProps = {
    dispatch: React.Dispatch<any>;
    values: FormValueProps;
  };
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
    updateApp: (key: FormValueProps) => void;
  };
  export interface ReorderFormValueProps {
    values: FormValueProps;
    desiredOrder: string[];
    hasEntry?: AddEntryProps[];
  }
  export interface InitValueProps {
    form: FormProps;
    onSubmit: (e: FormValueProps) => void;
  }
}
