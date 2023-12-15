import { FormatStoreFormProps } from "app-forms";
import { StoreProps } from "app-types";

export const formatStore = (props: FormatStoreFormProps) => {
  const { store, desiredOrder } = props;
  // console.log("store, desiredOrder :>> ", store, desiredOrder);

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!store) return { [key]: "" };
      const current = store[key as keyof StoreProps];
      // if()
      if (current) return { [key]: current };
      return { [key]: "" };
    })
  );
};
