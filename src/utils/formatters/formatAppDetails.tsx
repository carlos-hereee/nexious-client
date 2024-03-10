import { AppDetailsFormProps, AppDetailsProps } from "app-types";

export const formatAppDetails = ({ app, desiredOrder }: AppDetailsFormProps) => {
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
