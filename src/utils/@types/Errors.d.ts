declare module "app-errors" {
  import { AxiosError } from "axios";

  export interface GenericErrorMessagesProps {
    error: AxiosError;
    type: string;
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
