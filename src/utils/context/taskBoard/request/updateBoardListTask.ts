import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const updateBoardListTask = async ({ appId, board, dispatch }: TaskBoardDispatch) => {
  try {
    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    const { data } = await axiosAuth.put(`app/${appId}/task-board/update/list/${board?.boardId}`, board?.lists);
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
