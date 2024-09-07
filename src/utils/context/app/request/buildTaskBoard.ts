import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const buildTaskBoard = async ({ appId, values, updateAppData }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`/app/${appId}/task-board/build`, values);
    if (updateAppData) updateAppData(data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
