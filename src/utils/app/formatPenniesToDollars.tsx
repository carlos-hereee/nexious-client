import { MerchProps } from "store-context";

export const formatPenniesToDollars = (cost: number) => (cost / 100).toFixed(2);
export const formatDollarsToPennies = (cost: number) => cost * 100;
export const formatMerchFromPenniesToDollars = (data: MerchProps[]) => {
  // avoid mutating original array
  const oldValues = data;
  return oldValues.map((c) => {
    return { ...c, cost: formatPenniesToDollars(c.cost) };
  });
};
export const formatTotal = (cart: MerchProps[]) => {
  return cart.reduce((accumulator, currentValue) => {
    const price = currentValue.cost * (currentValue?.quantity || 1);
    return accumulator + price;
  }, 0);
};
