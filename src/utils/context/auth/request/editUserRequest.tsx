import { axiosAuth } from "@axios/axiosAuth";
import { AuthDispatchProps } from "auth-context";

export const editUserRequest = async ({ user, updateUser }: AuthDispatchProps) => {
  // require key variable
  if (!updateUser) throw Error("updateUser is required");
  try {
    const { data } = await axiosAuth.put("/auth/update-user", user);
    if (data) updateUser(data);
  } catch (error) {
    console.log("error updating user data :>> ", error);
  }
};
