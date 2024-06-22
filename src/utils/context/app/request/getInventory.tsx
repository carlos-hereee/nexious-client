import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const getInventory = async ({ storeId, dispatch, updateAppData }: AppDispatchProps) => {
  try {
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: true } });
    const { data } = await axiosAuth.get(`/store/inventory/${storeId}`);
    if (updateAppData) updateAppData(data);
    // dispatch({ type: APP_ACTIONS.SET_STORE_INVENTORY, payload: data });
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: false } });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: false } });
  }
};
