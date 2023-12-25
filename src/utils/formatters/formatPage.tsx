import { FormatPageProps } from "app-forms";
import { PageProps, SectionProps } from "app-types";
import { uniqueId } from "nexious-library";
import { entryKey } from "./entryKeys";

export const formatPage = (props: FormatPageProps): PageProps => {
  const { desiredOrder, hasEntry, values } = props;

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!values) return { [key]: "" };
      const current = values[key as keyof PageProps];
      if (typeof current === "boolean") return { [key]: current };
      if (Array.isArray(current) && hasEntry) {
        const form = hasEntry[entryKey[key]];
        const value = values[entryKey[key] as keyof PageProps];
        // error handling if has entry value is true but grouping is emty
        if (value && current.length === 0) {
          return { [key]: [{ ...form.initialValues, sharedKey: uniqueId() }] };
        }
        return {
          [key]: (current as SectionProps[]).map((val: SectionProps) => {
            const sharedKey = val.uid || val.heroId;
            return Object.assign(
              {},
              ...Object.keys(form.initialValues).map((k) => {
                if (k === "sectionHero") return { [k]: val.sectionHero || "", sharedKey };
                return { [k]: val[k as keyof SectionProps], sharedKey };
              })
            );
          }),
        };
      }
      return { [key]: current || "" };
    })
  );
};
