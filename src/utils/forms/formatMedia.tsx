import { FormatMediaProps } from "app-forms";
import { MediaItemProp, MediaProps } from "app-types";

export const formatMedia = (props: FormatMediaProps): MediaProps => {
  const { desiredOrder, hasEntry, values } = props;

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      const current = values[key as keyof MediaProps];
      if (typeof current === "boolean") {
        return { [key]: current };
      }
      if (Array.isArray(current) && hasEntry) {
        const form = hasEntry[key];
        return (current as MediaItemProp[]).map((val: MediaItemProp) => {
          return Object.assign(
            {},
            ...Object.keys(form.initialValues).map((k) => {
              if (k === "sectionHero") return { [k]: val.hero, sharedKey: val.uid };
              return { [k]: val[k as keyof MediaItemProp], sharedKey: val.uid };
            })
          );
        });
      }
      return { [key]: current || "" };
    })
  );
};
