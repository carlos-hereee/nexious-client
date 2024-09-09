import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const deleteTaskFromList = async ({ appId, listId, taskId, id }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.delete(`app/${appId}/task-board/${id}/list/${listId}/task/${taskId}`);
    console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
