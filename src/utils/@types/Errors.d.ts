declare module "app-errors" {
  import { AdminActionProps } from "app-admin";

  export interface GenericErrorMessagesProps {
    error: unknown;
    type: "form-error";
    target?: string;
    adminDispatch?: React.Dispatch<AdminActionProps>;
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
