import { MenuItemProps } from "app-types";

export const formatInitApp = (appName: string, logo: string, themeList: MenuItemProps[]) => {
  return {
    appName: appName || "",
    logo: logo || "",
    theme: `${themeList.map((list) => list.value).join(",")},`,
  };
};
