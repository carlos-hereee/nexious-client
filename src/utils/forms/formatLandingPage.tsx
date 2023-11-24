import { PageProps } from "app-context";
import { FormatLandingPageProps } from "app-forms";
import { SectionProps } from "app-types";

export const formatLandingPage = (props: FormatLandingPageProps): PageProps => {
  const { desiredOrder, hasEntry, values } = props;

  const entryKey: { [key: string]: string } = { cta: "hasCta", sections: "hasSections" };

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      const current = values[key as keyof PageProps];
      if (typeof current === "boolean") {
        return { [key]: current };
      }
      if (Array.isArray(current) && hasEntry) {
        const form = hasEntry[entryKey[key]];
        return (current as SectionProps[]).map((val: SectionProps) => {
          return Object.assign(
            {},
            ...Object.keys(form.initialValues).map((k) => {
              if (k === "sectionHero") return { [k]: val.hero, sharedKey: val.uid };
              return { [k]: val[k as keyof SectionProps], sharedKey: val.uid };
            })
          );
        });
      }
      return { [key]: current || "" };
    })
  );
};
