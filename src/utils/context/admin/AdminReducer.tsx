import { ADMIN_ACTIONS } from "@actions/AdminActions";
import { AdminActionProps, AdminStateProps } from "app-admin";

export const reducer = (state: AdminStateProps, action: AdminActionProps): AdminStateProps => {
  switch (action.type) {
    case ADMIN_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ADMIN_ACTIONS.SET_FORM_ERRORS:
      return { ...state, formErrors: { ...state.formErrors, ...action.payload } };
    default:
      return state;
  }
};
