import { AppListProps } from "app-context";

export const uniqueApplist = (appList: AppListProps[]) => {
  return appList?.map((app) => app.appName) || [];
};
