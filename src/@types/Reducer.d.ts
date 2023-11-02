declare module "reducer-dispatch-props" {
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
  export interface DispatchListProp {
    dispatch: React.Dispatch<any>;
    data: { [key: string]: string }[];
  }
  export interface DispatchMenuProp {
    dispatch: React.Dispatch<any>;
    data: MenuProps[];
  }
}
