import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { TaskBoardDispatch } from "task-board-context";

export const updateTaskBoardInivite = async ({ appId, id, user, status, dispatch }: TaskBoardDispatch) => {
  try {
    const route = appId ? `/task-board/${id}/invite` : "/task-board/invite";
    const { data } = await axiosAuth.put(route, { user, status });
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
