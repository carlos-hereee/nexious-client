import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const buildBoardListTask = async ({ id, listId, values, dispatch }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.post(`task-board/${id}/list/${listId}/task`, values);
    dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
