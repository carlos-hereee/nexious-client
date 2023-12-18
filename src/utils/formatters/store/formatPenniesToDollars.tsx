import { MerchProps } from "services-context";

export const formatPenniesToDollars = (cost: number) => cost / 100;
export const formatDollarsToPennies = (cost: number) => cost * 100;
export const formatMerchFromPenniesToDollars = (data: MerchProps[]) => {
  return data.map((c) => {
    return { ...c, cost: formatPenniesToDollars(c.cost) };
  });
};
export const formatTotal = (cart: MerchProps[]) => {
  return cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.cost * currentValue.quantity;
  }, 0);
};
