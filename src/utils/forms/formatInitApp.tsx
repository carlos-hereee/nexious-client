// import { MenuItemProps } from "app-types";

export const formatInitApp = (appName: string, logo: string) => {
  return {
    appName: appName || "",
    logo: logo || "",
    // theme: `${themeList.map((list) => list.value).join(",")},`,
  };
};
