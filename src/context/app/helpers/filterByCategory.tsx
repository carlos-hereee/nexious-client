export const filterByCategory = (arr, conditon) => {
  return arr.filter((a) => {
    for (let b = 0; b < conditon.length; b++) {
      const current = conditon[b];
      const category = conditon[b].type;
      if (a[category] === current[category]) {
        return true;
      }
    }
  });
};
