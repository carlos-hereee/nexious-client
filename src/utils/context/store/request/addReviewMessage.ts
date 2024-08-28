import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { StoreDispatchProps } from "store-context";

export const addReviewMessage = async ({ messageId, data: d, merch, messages, dispatch }: StoreDispatchProps) => {
  if (!messages) throw Error("messages param is required");
  if (!merch) throw Error("merch param is required");
  try {
    const { data } = await axiosAuth.post(`store/message/${messageId}`, d);
    // eslint-disable-next-line no-param-reassign
    merch.reviews = merch.reviews.map((review) => {
      if (review.messageId === messageId) return { ...review, replies: [...review.replies, data.message] };
      return review;
    });

    dispatch({ type: STORE_ACTIONS.SET_MERCH, payload: merch });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
