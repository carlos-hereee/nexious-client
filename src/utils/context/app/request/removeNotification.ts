import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const removeNotification = async ({ appId, id, updateAppData }: AppDispatchProps) => {
  // require key variable
  if (!updateAppData) throw Error("updateUser is required");
  if (!id) throw Error("notificationId is required");
  try {
    const { data } = await axiosAuth.delete(`/app/${appId}/remove-notification/${id}`);
    if (data) updateAppData(data);
  } catch (error) {
    console.log("error updating user data :>> ", error);
  }
};
