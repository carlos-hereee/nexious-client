import { TASK_ACTIONS } from "@actions/TaskBoardAction";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const buildTaskBoard = async ({ appId, values, dispatch }: TaskBoardDispatch) => {
  try {
    const route = appId ? `/task-board/${appId}/build` : "/task-board/build";

    const { data } = await axiosAuth.post(route, values);
    dispatch({ type: TASK_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: TASK_ACTIONS.SET_TASK_BOARD, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
