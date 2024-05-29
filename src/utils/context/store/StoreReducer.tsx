import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { ServiceActionProps as ActionProps, ServiceStateProps as StateProps } from "store-context";

export const reducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case SERVICE_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SERVICE_ACTIONS.UPDATE_CART:
      return { ...state, cart: action.payload };
    case SERVICE_ACTIONS.SET_STRIPE_SECRET:
      return { ...state, stripeSecret: action.payload };
    case SERVICE_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case SERVICE_ACTIONS.SET_STRIPE_CONFIRMATION:
      return { ...state, stripeConfirmation: action.payload };
    // case "UPDATE_BOOKABLE":
    //   return { ...state, isLoading: false, bookable: action.payload };
    // case "UPDATE_BOOKED":
    //   return { ...state, isLoading: false, booked: action.payload };
    // case "UPDATE_ACTIVE":
    //   return { ...state, isLoading: false, active: action.payload };
    // case "UPDATE_SERVICES":
    //   return { ...state, isLoading: false, services: action.payload };
    // case "BOOK_EVENT":
    //   return { ...state, isLoading: false, cart: action.payload };
    // // case "BOOK_REQUIRED":
    // //   return bookRequired(state, action);
    // // case "UPDATE_ITEM_QUANTITY":
    // //   return updateItemQuantity(state, action);
    // case "SET_IS_USER_REQ":
    //   return { ...state, isLoading: false, isUserReq: action.payload };
    // case "SET_TOTAL":
    //   return { ...state, isLoading: false, total: action.payload };
    default:
      return state;
  }
};
// const bookRequired = (state, action) => {
//   return {
//     ...state,
//     isLoading: false,
//     cart: state.cart.map((c, idx) => (idx === action.payload.idx ? action.payload.data : c)),
//   };
// };
// const updateItemQuantity = (state, action) => {
//   return {
//     ...state,
//     isLoading: false,
//     cart: state.cart.map((c) => (c.uid === action.payload.uid ? action.payload : c)),
//   };
// };
// type ReducerProps = (state: ServiceStateProps, action: ServiceActionProps) => void;
