// const isLoading = (state, action) => {
//   return { ...state, isLoading: action.payload };
// };
// const addMessageToLog = (state, action) => {
//   return { ...state, log: [...state.log, action.payload], isLoading: false };
// };
// const removeMessageFromLog = (state, action) => {
//   return {
//     ...state,
//     log: state.log.filter((i) => i.uid !== action.payload),
//     isLoading: false,
//   };
// };
// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "IS_LOADING":
//       return isLoading(state, action);
//     case "ADD_MESSAGE_TO_LOG":
//       return addMessageToLog(state, action);
//     case "REMOVE_MESSAGE_FROM_LOG":
//       return removeMessageFromLog(state, action);
//     default:
//       return state;
//   }
// };
