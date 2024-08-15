import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const sendMessage = async ({ updateAppData, message, appId, userId }: AppDispatchProps) => {
  if (userId) {
    const { data } = await axiosAuth.post(`/auth/${userId}/contact`, message);
    if (updateAppData) updateAppData(data);
  } else {
    const { data } = await axiosAuth.post(`/app/${appId || "platform"}/contact`, message);
    if (updateAppData) updateAppData(data);
  }
};
