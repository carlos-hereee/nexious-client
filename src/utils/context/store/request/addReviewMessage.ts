import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { StoreDispatchProps } from "store-context";

export const addReviewMessage = async ({ messageId, data: d, merch, messages }: StoreDispatchProps) => {
  try {
    console.log("merch, messages :>> ", merch, messages);
    const { data } = await axiosAuth.post(`store/message/${messageId}`, d);
    console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
