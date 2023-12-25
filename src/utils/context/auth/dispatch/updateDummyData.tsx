import { AUTH_ACTIONS } from "@actions/AuthActions";
import { AuthDispatchProps } from "auth-context";

export const updateDumnyData = async (props: AuthDispatchProps) => {
  //  key varaibles
  const { dispatch, login } = props;
  if (login) {
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: true });
    dispatch({ type: AUTH_ACTIONS.SET_DUMMY_DATA, payload: login });
    dispatch({ type: AUTH_ACTIONS.IS_LOADING, payload: false });
  }
};
