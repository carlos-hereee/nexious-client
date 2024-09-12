import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const updateTaskBoardInivite = async ({ appId, id, user, status, dispatch }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`app/${appId}/task-board/${id}/invite`, { user, status });
    dispatch({ type: APP_ACTIONS.SET_APP_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
