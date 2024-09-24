import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const deleteTaskFromList = async ({ listId, taskId, id, dispatch }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.delete(`task-board/${id}/list/${listId}/task/${taskId}`);
    dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
