import { FormatMediaProps } from "app-forms";
import { MediaItemProp, MediaProps } from "app-types";
import { entryKey } from "./entryKeys";

export const formatMedia = (props: FormatMediaProps): MediaProps => {
  const { desiredOrder, hasEntry, values } = props;

  if (!desiredOrder) return { title: "", subtitle: "", medias: [] };
  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!values) return { [key]: "" };
      const current = values[key as keyof MediaProps];
      if (typeof current === "boolean") {
        return { [key]: current };
      }
      if (Array.isArray(current) && hasEntry) {
        const form = hasEntry[entryKey[key]];
        const value = values[entryKey[key] as keyof MediaProps];
        // error handling if has entry value is true but grouping is emty
        if (value && current.length === 0) return form.initialValues;
        return {
          [key]: (current as MediaItemProp[]).map((val: MediaItemProp) => {
            return Object.assign(
              {},
              ...Object.keys(form.initialValues).map((k) => {
                return { [k]: val[k as keyof MediaItemProp], sharedKey: val.sharedKey };
              })
            );
          }),
        };
      }
      return { [key]: current || "" };
    })
  );
};
