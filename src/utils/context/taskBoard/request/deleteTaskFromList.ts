import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const deleteTaskFromList = async ({ appId, listId, taskId, id, dispatch }: TaskBoardDispatch) => {
  try {
    const { data } = await axiosAuth.delete(`app/${appId}/task-board/${id}/list/${listId}/task/${taskId}`);
    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
