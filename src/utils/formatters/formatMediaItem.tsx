import { FormatMediaProps } from "app-forms";
import { MediaItemProp } from "app-types";

export const formatMediaItem = (props: FormatMediaProps) => {
  const { media, desiredOrder } = props;
  if (!media || !desiredOrder) return { media: "", link: "" };
  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      const current = media[key as keyof MediaItemProp];
      return { [key]: current || "" };
    })
  );
};
