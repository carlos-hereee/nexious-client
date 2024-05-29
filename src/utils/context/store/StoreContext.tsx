import { createContext, useCallback, useMemo, useReducer } from "react";
import storeState from "@data/storeState.json";
import { ChildProps, StoreProps } from "app-types";
import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { CartProps, MerchProps, ServiceSchema } from "store-context";
import { reducer } from "./StoreReducer";
import { onAddToCart } from "./dispatch/onAddToCart";
import { requestSecret } from "./request/requestSecret";
import { checkOutSession } from "./request/checkOutSession";
import { confirmCheckoutIntent } from "./request/confirmCheckoutIntent";
import { checkoutStoreSession } from "./request/checkoutStoreSession";
// import { AppContext } from "../app/AppContext";
// import { bookEvent } from "./helpers/bookEvent";
// import { filter } from "./helpers/filter";
// import { addToBooked } from "./helpers/addToBooked";
// import { addToCart } from "./helpers/addToCart";
// import { setTotal } from "./helpers/setTotal";
// import { bookingRequired } from "./helpers/BookingRequired";
// import { setIsUserReq } from "./helpers/setIsUserReq";
// import { setActive } from "./helpers/setActive";
// import { updateServices } from "./helpers/updateServices";

export const StoreContext = createContext<ServiceSchema>({} as ServiceSchema);
export const StoreState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, storeState);

  const addToCart = useCallback((cart: CartProps[], store: StoreProps, merch: MerchProps) => {
    onAddToCart({ dispatch, cart, merch, store });
  }, []);

  const updateCart = useCallback((cart: CartProps[]) => {
    dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload: cart });
  }, []);

  const submitOrder = useCallback((cart: CartProps[]) => {
    requestSecret({ cart, dispatch });
  }, []);
  // stripe checkout session
  const onCheckOutSession = useCallback((cart: CartProps) => checkOutSession({ sessionCart: cart, dispatch }), []);
  // store checkout
  const onStoreCheckout = useCallback((cart: CartProps) => checkoutStoreSession({ sessionCart: cart, dispatch }), []);
  const confirmIntent = useCallback((sessionId: string) => {
    confirmCheckoutIntent({ dispatch, sessionId });
  }, []);
  const servicesValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      cart: state.cart,
      error: state.error,
      stripeSecret: state.stripeSecret,
      stripeConfirmation: state.stripeConfirmation,
      addToCart,
      updateCart,
      submitOrder,
      onCheckOutSession,
      confirmIntent,
      onStoreCheckout,
      // isFiltered: state.isFiltered,
      // filtered: state.filtered,
      // active: state.active,
      // isUserReq: state.isUserReq,
      // total: state.total,
      // bookable: state.bookable,
      // booked: state.booked,
      // services: state.services,
      // bookEvent: (a, b, c) => bookEvent(dispatch, a, b, c),
      // filter: (a, b) => filter(dispatch, a, b),
      // addToBooked: (a, b, c, d) => addToBooked(dispatch, a, b, c, d),
      // setActive: (a) => setActive(dispatch, a),
      // bookingRequired: (a, b) => bookingRequired(dispatch, a, b),
      // onQuantityChange: (a, b) => onQuantityChange(dispatch, a, b),
      // setIsUserReq: (a) => setIsUserReq(dispatch, a),
      // setTotal: (a) => setTotal(dispatch, a),
    };
  }, [state.isLoading, state.cart, state.stripeSecret, state.error]);
  return <StoreContext.Provider value={servicesValues}>{children}</StoreContext.Provider>;
};

// return (
//   <StoreContext.Provider
//     value={{
//       isLoading: state.isLoading,
//       isFiltered: state.isFiltered,
//       filtered: state.filtered,
//       cart: state.cart,
//       active: state.active,
//       isUserReq: state.isUserReq,
//       total: state.total,
//       bookable: state.bookable,
//       booked: state.booked,
//       services: state.services,
//       bookEvent: (a, b, c) => bookEvent(dispatch, a, b, c),
//       filter: (a, b) => filter(dispatch, a, b),
//       setActive: (a) => setActive(dispatch, a),
//       bookingRequired: (a, b) => bookingRequired(dispatch, a, b),
//       onQuantityChange: (a, b) => onQuantityChange(dispatch, a, b),
//       setIsUserReq: (a) => setIsUserReq(dispatch, a),
//       setTotal: (a) => setTotal(dispatch, a),
//     }}
//   >
//     {children}
//   </StoreContext.Provider>
