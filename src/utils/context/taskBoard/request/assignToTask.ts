import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const assignToTask = async ({ id, taskId, userId, dispatch, status }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.put(`task-board/${id}/assign/${taskId}/${userId}`, { status });

    dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: "CONFIRM" });
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
