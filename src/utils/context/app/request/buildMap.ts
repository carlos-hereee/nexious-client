import { axiosAuth } from "@axios/axiosAuth";
import { AppDispatchProps } from "app-context";

export const buildMap = async ({ map, appId }: AppDispatchProps) => {
  try {
    const { data } = await axiosAuth.post(`/app/${appId}/build-map`, map);
    console.log("data :>> ", data);
  } catch (error) {
    console.log("error :>> ", error);
  }
};
