import { MenuProps } from "app-types";

export const toggleAuthMenuItem = (menuItem: MenuProps, target: string) => {
  const oldValues = menuItem;
  oldValues.name = target;
  oldValues.value = target;
  oldValues.link = target === "logout" ? "" : target;
  oldValues.label = target;
  // remove icons
  // if (oldValues.icon) oldValues.icon = target;
  return oldValues;
};
