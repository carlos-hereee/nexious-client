import { AppListProps } from "app-types";

export const uniqueApplist = (appList: AppListProps[], appName?: string) => {
  if (appName)
    return (
      appList?.map((app) => {
        if (appName === app.appName) return "";
        return app.appName;
      }) || []
    );
  return appList?.map((app) => app.appName) || [];
};
