interface Params<A = { [key: string]: string }> {
  arr: A[];
  key: string;
}
export const sortByABC = <T>({ arr, key }: Params<T>) => {
  return arr.sort((a, b) => a[key].localeCompare(b[key]));
};
export const sortByABCRemoveDups = <T>({ arr, key }: Params<T>) => {
  const seen: { [x: string]: T } = {};
  const removedDups = arr.filter((entry) => {
    if (seen[entry[key]]) return false;
    seen[entry[key]] = entry;
    return true;
  });
  return removedDups.sort((a, b) => a[key].localeCompare(b[key]));
};
export const removeArrayDups = <T>({ arr, key }: Params<T>) => {
  const seen: { [x: string]: T } = {};
  return arr.filter((entry) => {
    if (seen[entry[key]]) return false;
    seen[entry[key]] = entry;
    return true;
  });
};
