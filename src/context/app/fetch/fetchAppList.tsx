// import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/types/AppActions";
import { DispatchProps } from "reducer-dispatch-props";

export const fetchAppList = async (props: DispatchProps) => {
  const { dispatch } = props;
  // try {
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
  const { data } = await axiosAuth.get("app/app-list");
  dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: data });
  dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  // } catch (error) {
  //   isDev && console.log("error occurred getting appList", error);
  //   dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  // }
};
