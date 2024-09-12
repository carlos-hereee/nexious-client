import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const updateBoardListTask = async ({ appId, board, dispatch }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    const { data } = await axiosAuth.put(`app/${appId}/task-board/update/list/${board?.boardId}`, board?.lists);
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
