// const bookNow = (state, action) => {
//   return { state, meeting: action.payload };
// };
// const bookEvent = (state, action) => {
//   return { ...state, booked: [...state.booked, action.payload] };
// };
// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "IS_LOADING":
//       return { ...state, isLoading: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     case "BOOKED":
//       return { ...state, booked: action.payload };
//     case "UPDATE_SELECTED_DAY":
//       return { ...state, selectedDay: action.payload };
//     case "UPDATE_MEETING":
//       return { ...state, meeting: action.payload };
//     case "UPDATE_CALENDAR":
//       return { ...state, calendar: action.payload };
//     case "BOOK_NOW":
//       return bookNow(state, action);
//     case "BOOK_EVENT":
//       return bookEvent(state, action);
//     default:
//       return state;
//   }
// };
