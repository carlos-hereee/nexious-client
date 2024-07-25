interface SortList<L = { updatedAt: string }[]> {
  list: L;
}
export const sortList = ({ list }: SortList) => {
  return list.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};
export const sortDecendingList = ({ list }: SortList) => {
  return list.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
};
