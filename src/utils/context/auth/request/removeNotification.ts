import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";

export const removeNotification = async ({ data: notificationId, updateUser }: AuthDispatchProps) => {
  // require key variable
  if (!updateUser) throw Error("updateUser is required");
  if (!notificationId) throw Error("notificationId is required");
  try {
    const { data } = await axiosAuth.delete(`/auth/remove-notification/${notificationId}`);
    if (data) updateUser(data);
  } catch (error) {
    console.log("error updating user data :>> ", error);
  }
};
