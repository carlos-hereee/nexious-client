import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { APP_ACTIONS } from "@app/utils/types/AppActions";

type AppListProps = {
  dispatch: React.Dispatch<any>;
};
export const getAppList = async (props: AppListProps) => {
  const { dispatch } = props;
  try {
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.get("app/all-apps");
    dispatch({ type: APP_ACTIONS.SET_APP_LIST, payload: data });
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  } catch (error) {
    isDev && console.log("error occurred getting appList", error);
    dispatch({ type: APP_ACTIONS.IS_LOADING, payload: false });
  }
};
