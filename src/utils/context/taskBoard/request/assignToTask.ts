import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const assignToTask = async ({ appId, id, taskId, userId, dispatch, status }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.put(`app/${appId}/task-board/${id}/assign/${taskId}/${userId}`, { status });

    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "CONFIRM" });
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
