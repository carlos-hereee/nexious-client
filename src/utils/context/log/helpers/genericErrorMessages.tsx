import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { isDev } from "@config";
import { GenericErrorMessagesProps } from "app-errors";
import { AxiosError } from "axios";

export const genericErrorMessages = async (props: GenericErrorMessagesProps) => {
  const { error, type, adminDispatch, target } = props;
  try {
    // if (type === "auth") {
    //   console.log("type :>> ", type);
    // }
    if (adminDispatch) {
      const err = error as AxiosError;
      if (type === "form-error" && target) {
        const payload = { [target]: err.response?.data };
        adminDispatch({ type: ADMIN_ACTIONS.SET_FORM_STATUS, payload: "ERROR" });
        adminDispatch({ type: ADMIN_ACTIONS.SET_FORM_ERRORS, payload });
        adminDispatch({ type: ADMIN_ACTIONS.IS_LOADING, payload: false });
      }
    }
    if (isDev) console.log("error :>> ", error);
  } catch (e) {
    if (isDev) console.log("e :>> ", e);
  }
};
