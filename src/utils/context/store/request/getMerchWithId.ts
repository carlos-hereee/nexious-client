import { STORE_ACTIONS } from "@actions/StoreActions";
import { axiosAuth } from "@axios/axiosAuth";
import { isDev } from "@config";
import { StoreDispatchProps } from "store-context";

export const getMerchWithId = async ({ merchId, dispatch }: StoreDispatchProps) => {
  try {
    const { data } = await axiosAuth.get(`store/merch/${merchId}`);
    dispatch({ type: STORE_ACTIONS.SET_MERCH, payload: data.merch });
  } catch (error) {
    if (isDev) console.log("error", error);
  }
};
