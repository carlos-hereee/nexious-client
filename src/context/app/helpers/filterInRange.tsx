export const filterInRange = (arr, min, max, category) => {
  return arr.filter((a) => min < a[category] && a[category] < max);
};
