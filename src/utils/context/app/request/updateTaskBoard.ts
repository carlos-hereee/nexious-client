import { APP_ACTIONS } from "@actions/AppActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const updateTaskBoard = async ({ appId, values, id, dispatch }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.put(`app/${appId}/task-board/update/${id}`, values);

    dispatch({ type: APP_ACTIONS.SET_REQUEST_STATUS, payload: "SUCCESS" });
    dispatch({ type: APP_ACTIONS.SET_APP_BOARD_TASKS, payload: data });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
