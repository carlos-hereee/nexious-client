import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const sendMessage = async ({ updateAppData, message, appId }: AppDispatchProps) => {
  const { data } = await axiosAuth.post(`/app/${appId || "platform"}/contact/`, message);
  if (updateAppData) updateAppData(data);
};
