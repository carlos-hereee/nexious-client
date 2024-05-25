import { FormatAppMenuValue, FormatFormValue, FormatPageProps } from "app-forms";
import { MenuProp, StringBooleanObjProp } from "app-types";

interface AddArrayInObject<T = StringBooleanObjProp> {
  obj: { [key: string]: T[] };
  key: string;
  value: T;
}
const addArrayInObj = ({ obj, key, value }: AddArrayInObject) => {
  // eslint-disable-next-line no-param-reassign
  if (obj[key]) obj[key] = [...obj[key], value];
  // eslint-disable-next-line no-param-reassign
  else obj[key] = [value];
};

export const formatInitialValues: FormatFormValue = (data) => {
  const { values, desiredOrder, landing, menu, page } = data;
  //  values
  if (values) return Object.assign({}, ...desiredOrder.map((key) => ({ [key]: values[key] || "" })));
  //  landing
  if (landing) return Object.assign({}, ...desiredOrder.map((key) => ({ [key]: landing[key] })));
  if (page) return Object.assign({}, ...desiredOrder.map((key) => ({ [key]: page[key] })));
  //  app menu
  if (menu) return Object.assign({}, ...desiredOrder.map((key) => ({ [key]: menu[key] || "" })));
  // default to assigning a field for each item in disired order
  return Object.assign({}, ...desiredOrder.map((key) => ({ [key]: "" })));
};
export const formatInitialEntryValues = ({ addEntry, page }: FormatPageProps) => {
  // find extra values for pages
  const entries = {};
  if (page) {
    //  iterate initial values
    Object.keys(page).forEach((value) => {
      // if value should have entries
      if (page[value] && addEntry[value]) {
        const { desiredOrder, groupName } = addEntry[value];
        if (groupName) {
          // add entries
          if (page[groupName].length > 0) {
            page[groupName].forEach((p: StringBooleanObjProp) => {
              const entry = formatInitialValues({ desiredOrder, page: p });
              addArrayInObj({ obj: entries, key: groupName, value: entry });
            });
          } else {
            const entry = formatInitialValues({ desiredOrder });
            addArrayInObj({ obj: entries, key: groupName, value: entry });
          }
        }
      }
    });
  }
  return entries;
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
