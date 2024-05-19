import { FormatAppMenuValue, FormatFormValue } from "app-forms";
import { MenuProp } from "app-types";

export const formatInitialValues: FormatFormValue = ({ values, desiredOrder }) => {
  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!values) return { [key]: "" };
      const value = values[key];
      if (value) return { [key]: value };
      return { [key]: "" };
    })
  );
};
export const formatAppMenuValues: FormatAppMenuValue = ({ values, desiredOrder }) => {
  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!values) return { [key]: "" };
      const value = values[key as keyof MenuProp];
      if (typeof value !== "undefined") return { [key]: value };
      return { [key]: "" };
    })
  );
};
