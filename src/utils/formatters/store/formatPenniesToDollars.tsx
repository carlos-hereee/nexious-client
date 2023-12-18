import { MerchProps } from "services-context";

export const formatPenniesToDollars = (cost: number) => cost / 100;
export const formatMerchFromPenniesToDollars = (data: MerchProps[]) => {
  return data.map((c) => {
    return { ...c, cost: formatPenniesToDollars(c.cost) };
  });
};
