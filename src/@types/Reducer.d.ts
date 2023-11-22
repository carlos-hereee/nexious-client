declare module "reducer-dispatch-props" {
  import { FormProps, FormValueProps } from "app-forms";
  import { AppListProps } from "app-context";
  import { APP_ACTIONS } from "@app/utils/types/AppActions";
  import { AdminIdProps, MenuItemProps, MenuProps, NewsletterProps } from "app-types";

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
    dispatch: React.Dispatch<APP_ACTIONS>;
    data: FormValueProps;
    handleAppAssets: (key: FormValueProps) => void;
  }

  export type AppActionProps =
    | {
        type: APP_ACTIONS.IS_LOADING | APP_ACTIONS.COOMING_SOON;
        payload: boolean;
      }
    | {
        type: APP_ACTIONS.SET_APP_ID;
        payload: string;
      }
    | {
        type: APP_ACTIONS.SET_THEME_LIST;
        payload: MenuItemProps[];
      }
    | {
        type: APP_ACTIONS.SET_ACTIVE_MENU;
        payload: MenuProps[];
      }
    | {
        type: APP_ACTIONS.SET_APP_LIST;
        payload: AppListProps[];
      }
    | {
        type: APP_ACTIONS.SET_NEWSLETTER;
        payload: NewsletterProps;
      }
    | {
        type: APP_ACTIONS.SET_ADMIN_IDS;
        payload: AdminIdProps[];
      };
}
