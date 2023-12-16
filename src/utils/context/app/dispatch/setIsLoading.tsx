import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setIsLoading = (props: AppDispatchProps) => {
  const { dispatch, isLoading } = props;
  if (isLoading) dispatch({ type: APP_ACTIONS.IS_LOADING, payload: isLoading });
  else dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
