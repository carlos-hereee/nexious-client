declare module "app-errors" {
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
  export type AxiosResponseError = AuthResponseError | AppResponseError | LogResponseError;
}
