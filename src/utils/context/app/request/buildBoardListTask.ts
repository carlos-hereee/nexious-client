import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const buildBoardListTask = async ({ appId, id, listId, values, dispatch }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`app/${appId}/task-board/${id}/list/${listId}/task`, values);
    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    console.log("data :>> ", data);
    dispatch({ type: APP_ACTIONS.SET_APP_BOARD_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
