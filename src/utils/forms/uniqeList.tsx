import { AppListProps } from "app-types";

export const uniqueApplist = (appList: AppListProps[]) => {
  return appList?.map((app) => app.appName) || [];
};
