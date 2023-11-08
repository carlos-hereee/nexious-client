export const updateAppliedFilter = (dispatch, applied, { key, value }) => {
  let entry = { [key]: value, type: key, key: shortid.generate() };
  let list = getList(applied, key);

  if (list === undefined) {
    // model does not exist add to applied filters
    applied.push({ ...entry, list: [entry] });
  } else {
    const isMatch = list.list.some((f) => f[key] === value);
    if (isMatch) {
      const idx = list.list.findIndex((l) => l[key] === value);
      list.list.pop(idx);
      if (!list.list.length) {
        return dispatch({ type: "RESET_FILTER", payload: [] });
      }
    } else {
      list.list.push({ ...entry, list: [(prev) => prev, entry] });
    }
  }
  dispatch({ type: "UPDATE_APPLIED_FILTER", payload: applied });
};
