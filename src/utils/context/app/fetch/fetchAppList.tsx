import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";

export const fetchAppList = async (props: AppDispatchProps) => {
  const { dispatch } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get("app/app-list");
  dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: data });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
