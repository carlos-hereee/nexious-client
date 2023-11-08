import { KeyStringProp } from "app-types";

export const formatInitApp = (appName: string, logo: string, themeList: KeyStringProp[]) => {
  return {
    appName: appName || "",
    logo: logo || "",
    theme: themeList.map((list) => list.value).join(",") + ",",
  };
};
