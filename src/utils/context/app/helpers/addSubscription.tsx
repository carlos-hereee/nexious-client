import { axiosAuth } from "@axios/axiosAuth";
// import { axiosMedia } from "@axios/axiosMedia";
import { isDev } from "@config";
import { AppDispatchProps } from "app-context";

export const addSubscription = async ({ dispatch, appId, subscription }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`/app/create-subscription/${appId || "platform"}`, { subscription });
    // const response = await axiosMedia.post("/app/add-page", a);
    console.log("data :>> ", data);
    // console.log("response", response);
  } catch (error) {
    if (isDev) console.log("error :>> ", error);
  }
};
