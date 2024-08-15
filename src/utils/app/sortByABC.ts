interface Params<A = { [key: string]: string }> {
  arr: A[];
  key: string;
}
export const sortByABC = <T>({ arr, key }: Params<T>) => {
  return arr.sort((a, b) => a[key].localeCompare(b[key]));
};
