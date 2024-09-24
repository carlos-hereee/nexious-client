import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const updateTaskBoard = async ({ values, id, dispatch }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.put(`task-board/update/${id}`, values);

    dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
