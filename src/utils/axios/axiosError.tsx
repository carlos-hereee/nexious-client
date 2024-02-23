import { AUTH_ACTIONS } from "@actions/AuthActions";
import { GenericErrorMessagesProps } from "app-errors";
import { AxiosError } from "axios";

export const axiosError = (props: GenericErrorMessagesProps) => {
  const { error, type, target } = props;
  // require key variable
  if (!target) throw Error("target is required");
  const err = error as AxiosError;
  if (type === "auth") {
    // require key variable
    if (!props.authDispatch) throw Error("authDispatch is required");
    const dispatch = props.authDispatch;
    // if service disconnect
    if (err.code === "ERR_NETWORK") dispatch({ type: AUTH_ACTIONS.SET_STRANDED, payload: true });
    else {
      // if logout error
      if (target === "logout-error") dispatch({ type: AUTH_ACTIONS.LOGOUT_ERROR, payload: `${err.response?.data}` });
      if (target === "logout-error") dispatch({ type: AUTH_ACTIONS.LOGOUT_ERROR, payload: `${err.response?.data}` });
    }
    // update loading state
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
