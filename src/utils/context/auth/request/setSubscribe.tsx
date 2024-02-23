import { axiosAuth } from "@axios/axiosAuth";
import { axiosError } from "@axios/axiosError";
import { AuthDispatchProps } from "auth-context";

export const setSubscribe = async (props: AuthDispatchProps) => {
  const { dispatch, appId, updateUser } = props;
  try {
    const { data } = await axiosAuth.post(`/app/subscribe/${appId}`);
    if (data && updateUser) updateUser(data);
  } catch (error) {
    axiosError({ dispatch, type: "auth", error, target: "subscribe" });
  }
};
