import appState from "@data/adminState.json";
import { HeaderProps } from "app-types";
import { uniqueId, capFirstCharacter } from "nexious-library";

const icons: { [key: string]: string } = {
  login: "login",
  dashboard: "user",
};

const formatMenuItem = (item: string) => {
  return {
    label: capFirstCharacter(item),
    icon: icons[item] || "",
    name: item,
    uid: uniqueId(),
  };
};

export const formatHeaderValues = (props: HeaderProps) => {
  const { language, locale, theme } = props;
  const { languageList, themeList } = appState;
  const tList = theme.split(",").filter((item) => item);
  const lList = language.split(",").filter((item) => item);

  const loginMenuItem = formatMenuItem("login");
  const dashboardMenuItem = formatMenuItem("dashboard");
  const themePayload = {
    isToggle: true,
    isPrivate: false,
    menuId: uniqueId(),
    active: themeList.filter((tl) => tl.value === tList[0])[0],
    alternatives: themeList.filter((tl) => tList.includes(tl.value)),
  };
  const languagePayload = {
    isToggle: true,
    isPrivate: false,
    menuId: uniqueId(),
    active: languageList.filter((list) => list.value === locale)[0],
    // TODO:  add all client selected languages here
    alternatives: languageList.filter((list) => lList.includes(list.value)),
  };
  const authPayload = {
    isToggle: false,
    isPrivate: true,
    menuId: uniqueId(),
    active: loginMenuItem,
    alternatives: [loginMenuItem, dashboardMenuItem],
  };

  return [themePayload, languagePayload, authPayload];
};
