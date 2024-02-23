declare module "app-errors" {
  import { AuthActionProps } from "auth-context";
  import { AdminActionProps } from "app-admin";

  export interface GenericErrorMessagesProps {
    error: unknown;
    type: "form-error" | "auth";
    target: "logout-error" | "sign-in-error";
    message?: string;
    adminDispatch?: React.Dispatch<AdminActionProps>;
    authDispatch?: React.Dispatch<AuthActionProps>;
  }
  export interface AuthErrorProps {
    emergencyPasswordChangeIsRequired: boolean;
    userNotFound: boolean;
    serverIsOffline: boolean;
    signInError: string;
    signUpError: string;
    logOutError: string;
    changePasswordError: string;
    forgotPasswordError: string;
  }
}
