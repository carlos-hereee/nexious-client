import { MenuProps } from "app-types";

export const toggleAuthMenuItem = (menuItem: MenuProps, target: string) => {
  const oldValues = menuItem;
  if (oldValues?.name) oldValues.name = target;
  if (oldValues?.value) oldValues.value = target;
  if (oldValues?.link) oldValues.link = target === "logout" ? "" : target;
  if (oldValues?.label) oldValues.label = target;
  // remove icons
  // if (oldValues.icon) oldValues.icon = target;
  return oldValues;
};
