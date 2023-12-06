// export const updateFilter = (arr, appliedFilters) => {
//   let conditions = [];
//   let price = {};

//   for (let af = 0; af < appliedFilters.length; af++) {
//     const input = appliedFilters[af];
//     if (input.type === "minprice" || input.type === "maxprice") {
//       price[input.type] = parseInt(input[input.type]);
//     } else conditions.push(...input.list);
//   }
//   // if price filter  has value
//   if (price.minprice || price.maxprice) {
//     const { minprice, maxprice } = price;
//     arr = filterInRange(arr, minprice || 0, maxprice || 999999, "price");
//   }

//   // check other filters
//   if (conditions.length > 0) {
//     arr = filterByCategory(arr, conditions);
//   }
//   dispatch({ type: "UPDATE_FILTER", payload: arr });
// };
