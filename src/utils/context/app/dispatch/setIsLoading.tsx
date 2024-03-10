import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const setIsLoading = ({ dispatch, isLoading }: AppDispatchProps) => {
  if (isLoading) dispatch({ type: APP_ACTIONS.IS_LOADING, payload: isLoading });
  else dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
