import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { StoreDispatchProps } from "store-context";

export const addReview = async ({ merchId }: StoreDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`store/merch/${merchId}/review`);
    console.log("data :>> ", data);
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
