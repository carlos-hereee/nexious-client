import { createContext, useCallback, useMemo, useReducer } from "react";
import checkoutState from "@data/checkoutState.json";
import { ChildProps } from "app-types";
import { CheckoutSchema, CheckoutValues } from "checkout-context";
import { CartProps, MerchProps, OrderSchema } from "store-context";
import { CHECKOUT_ACTIONS } from "@actions/CheckoutActions";

import { reducer } from "./CheckoutReducer";
import { onAddToCart } from "./dispatch/onAddToCart";
// import { requestSecret } from "./request/requestSecret";
// import { checkOutSession } from "./request/checkOutSession";
// import { confirmCheckoutIntent } from "./request/confirmCheckoutIntent";
// import { checkoutStoreSession } from "./request/checkoutStoreSession";
// import { getStripeBalance } from "./request/getStripeBalance";
// import { managePayouts } from "./request/managePayouts";
// import { getStripeAccount } from "./request/getStripeAccount";
// import { billingPortal } from "./request/billingPortal";
// import { trackCheckoutOrder } from "./request/trackCheckoutOrder";
// import { addReview } from "./request/addReview";
// import { getMerchWithId } from "./request/getMerchWithId";
// import { addReviewMessage } from "./request/addReviewMessage";

export const CheckoutContext = createContext<CheckoutSchema>({} as CheckoutSchema);
export const CheckoutState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, checkoutState);

  const addToCart = useCallback((data: CheckoutValues) => onAddToCart({ dispatch, ...data }), []);

  const updateCart = useCallback((cart: CartProps[]) => dispatch({ type: CHECKOUT_ACTIONS.UPDATE_CART, payload: cart }), []);
  const setLoading = useCallback((loading: boolean) => dispatch({ type: CHECKOUT_ACTIONS.IS_LOADING, payload: loading }), []);
  const setMerch = useCallback((data: MerchProps) => dispatch({ type: CHECKOUT_ACTIONS.SET_MERCH, payload: data }), []);
  const setOrder = useCallback((data?: OrderSchema) => dispatch({ type: CHECKOUT_ACTIONS.SET_ORDER, payload: data }), []);
  // const setTrackOrder = useCallback((data?: OrderSchema) => dispatch({ type: CHECKOUT_ACTIONS.SET_TRACK_ORDER, payload: data }), []);

  // const submitOrder = useCallback((cart: CartProps[]) => requestSecret({ cart, dispatch }), []);
  // // stripe checkout session
  // const onCheckOutSession = useCallback((data: StoreCheckout) => checkOutSession({ ...data, dispatch }), []);
  // // store checkout
  // const onStoreCheckout = useCallback((data: StoreCheckout) => checkoutStoreSession({ ...data, dispatch }), []);
  // const confirmIntent = useCallback((data: CheckoutIntent) => confirmCheckoutIntent({ dispatch, ...data }), []);
  // const getMerch = useCallback((merchId: string) => getMerchWithId({ dispatch, merchId }), []);
  // const orderTracker = useCallback((data: TrackOrder) => trackCheckoutOrder({ dispatch, ...data }), []);
  // const getBalance = useCallback((appId: string) => getStripeBalance({ dispatch, appId }), []);
  // const handlePayouts = useCallback((data: PayoutAmmount) => managePayouts({ dispatch, ...data }), []);

  const checkoutValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      cart: state.cart,
      error: state.error,
      order: state.order,
      merch: state.merch,
      addToCart,
      updateCart,
      setLoading,
      setMerch,
      setOrder,
      // submitOrder,
      // onCheckOutSession,
      // confirmIntent,
      // onStoreCheckout,
      // setLoading,
      // getBalance,
      // handlePayouts, // stripe account
      // getAccount,
      // manageBilling,
      // orderTracker,
      // setTrackOrder,
      // postReview,
      // setMerch,
      // getMerch,
      // replyReviewMessage,
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
  }, [state.isLoading, state.cart]);
  return <CheckoutContext.Provider value={checkoutValues}>{children}</CheckoutContext.Provider>;
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
