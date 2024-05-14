import { axiosAuth } from "@axios/axiosAuth";
import { APP_ACTIONS } from "@actions/AppActions";
import { AppDispatchProps } from "app-context";
import { AxiosError } from "axios";

export const getInventory = async (props: AppDispatchProps) => {
  const { storeId, dispatch } = props;
  try {
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: true } });
    const { data } = await axiosAuth.get(`/store/inventory/${storeId}`);
    dispatch({ type: APP_ACTIONS.SET_STORE_INVENTORY, payload: data });
    console.log("data :>> ", data);
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: false } });
  } catch (error) {
    const err = error as AxiosError;
    dispatch({ type: APP_ACTIONS.SET_APP_ERROR, payload: `${err.response?.data}` });
    dispatch({ type: APP_ACTIONS.SET_LOADING_STATE, payload: { isLoadingInventory: false } });
  }
};
