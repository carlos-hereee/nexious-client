declare module "app-errors" {
  import { AdminActionProps } from "app-admin";
  import { AppActionProps } from "app-context";
  import { LogActionProps } from "log-context";
  import { AuthActionProps } from "auth-context";

  export interface AxiosError {
    error: unknown;
    message?: string;
    target?: string;
  }

  export type AuthErrorTarget = "logout" | "login" | "register" | "subscribe" | "offline" | "forgotPassword";
  export type AppErrorTarget = "";
  export type FormErrorTarget =
    | "token"
    | "updateAppDetails"
    | "initApp"
    | "updateLanding"
    | "updateStore"
    | "buildStore"
    | "addMerch"
    | "removeMerch";

  export interface AuthResponseError extends AxiosError {
    type: "auth";
    target: AuthErrorTarget;
    dispatch: React.Dispatch<AuthActionProps>;
  }
  export interface AppResponseError extends AxiosError {
    type: "app";
    dispatch: React.Dispatch<AppActionProps>;
    target: AppErrorTarget;
  }
  export interface LogResponseError extends AxiosError {
    type: "log";
    dispatch: React.Dispatch<LogActionProps>;
  }
  export interface FormResponseError extends AxiosError {
    type: "form-error" | "accessToken";
    target: FormErrorTarget;
    dispatch: React.Dispatch<AdminActionProps>;
  }

  export type AxiosResponseError = AuthResponseError | AppResponseError | LogResponseError | FormResponseError;
}
