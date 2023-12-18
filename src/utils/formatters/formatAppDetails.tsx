import { AppDetailsFormProps, AppDetailsProps } from "app-types";

export const formatAppDetails = (props: AppDetailsFormProps) => {
  const { app, desiredOrder } = props;
  // console.log("store, desiredOrder :>> ", store, desiredOrder);

  return Object.assign(
    {},
    ...desiredOrder.map((key) => {
      if (!app) return { [key]: "" };
      const current = app[key as keyof AppDetailsProps];
      // if()
      if (current) return { [key]: current };
      return { [key]: "" };
    })
  );
};
