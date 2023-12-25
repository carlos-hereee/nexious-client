import { FormatMerchFormProps } from "app-forms";
import { MerchProps } from "services-context";

export const formatMerch = (props: FormatMerchFormProps) => {
  const { merch, desiredOrder } = props;
  // console.log("store, desiredOrder :>> ",merch, desiredOrder);

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!merch) return { [key]: "" };
      const current = merch[key as keyof MerchProps];
      if (current) return { [key]: current };
      return { [key]: "" };
    })
  );
};
