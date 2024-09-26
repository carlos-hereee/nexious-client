import { CHECKOUT_ACTIONS } from "@actions/CheckoutActions";
import { CheckoutActionProps, CheckoutStateProps } from "checkout-context";

export const reducer = (state: CheckoutStateProps, action: CheckoutActionProps): CheckoutStateProps => {
  switch (action.type) {
    case CHECKOUT_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case CHECKOUT_ACTIONS.UPDATE_CART:
      return { ...state, cart: action.payload };
    case CHECKOUT_ACTIONS.SET_MERCH:
      return { ...state, merch: action.payload };
    case CHECKOUT_ACTIONS.SET_ORDER:
      return { ...state, order: action.payload };
    case CHECKOUT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };

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
// type ReducerProps = (state: StoreStateProps, action: ServiceActionProps) => void;
