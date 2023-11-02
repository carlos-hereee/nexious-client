import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";
import { GetAppNameReducerProps } from "app-forms";

export const getAppWithName = async (props: GetAppNameReducerProps) => {
  const { appName, updateApp } = props;
  try {
    const { data } = await axiosAuth.get(`/app/${appName}`);
    updateApp(data);
  } catch (error) {
    isDev && console.log("error getting app with app name", error);
  }
};
