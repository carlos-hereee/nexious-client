declare module "reducer-dispatch-props" {
  import { FormProps, FormValueProps } from "app-forms";
  import { MenuProps } from "app-types";
  export interface DispatchProps {
    dispatch: React.Dispatch<any>;
  }
  export interface DispatchStringProp {
    dispatch: React.Dispatch<any>;
    data: string;
  }
  export interface DispatchDataProp {
    dispatch: React.Dispatch<any>;
    data: { [key: string]: string };
  }
  export interface DispatchFormValueProp {
    dispatch: React.Dispatch<any>;
    values: FormProps;
  }
  export interface DispatchListProp {
    dispatch: React.Dispatch<any>;
    data: { [key: string]: string }[];
  }
  export interface DispatchMenuProp {
    dispatch: React.Dispatch<any>;
    data: MenuProps[];
  }
  export interface DispatchAppAssets {
    dispatch: React.Dispatch<any>;
    data: FormValueProps;
    handleAppAssets: (key: FormValueProps) => void;
  }
}
