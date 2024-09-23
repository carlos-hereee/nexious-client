import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const updateTaskBoard = async ({ values, id, dispatch }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.put(`task-board/update/${id}`, values);

    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.SET_APP_BOARD_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
