import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { AppDispatchProps } from "reducer-dispatch-props";

export const fetchAppList = async (props: AppDispatchProps) => {
  const { dispatch } = props;
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get("app/app-list");
  dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: data });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
};
