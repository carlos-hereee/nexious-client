import { createContext, useCallback, useMemo, useReducer } from "react";
import checkoutState from "@data/checkoutState.json";
import { ChildProps } from "app-types";
import { CheckoutSchema, CheckoutValues } from "checkout-context";

import { reducer } from "./CheckoutReducer";
import { onAddToCart } from "./dispatch/onAddToCart";
// import { onAddToCart } from "./dispatch/onAddToCart";
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

  // const updateCart = useCallback((cart: CartProps[]) => dispatch({ type: STORE_ACTIONS.UPDATE_CART, payload: cart }), []);
  // const setLoading = useCallback((loading: boolean) => dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: loading }), []);
  // const setOrder = useCallback((data?: OrderSchema) => dispatch({ type: STORE_ACTIONS.SET_STORE_ORDER, payload: data }), []);
  // const setMerch = useCallback((data?: MerchProps) => dispatch({ type: STORE_ACTIONS.SET_MERCH, payload: data }), []);
  // const setTrackOrder = useCallback((data?: OrderSchema) => dispatch({ type: STORE_ACTIONS.SET_TRACK_ORDER, payload: data }), []);

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

  // const updateAccount = useCallback((config: StripeConfig) => {
  //   updateStripeAccount({ dispatch, config });
  // }, []);
  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      cart: state.cart,
      error: state.error,
      // trackOrder: state.trackOrder,
      // order: state.order,
      // location: state.location,
      // location2: state.location2,
      merch: state.merch,
      stripeSecret: state.stripeSecret,
      // stripeConfirmation: state.stripeConfirmation,
      // stripeConfig: state.stripeConfig,
      // stripeBalance: state.stripeBalance,
      addToCart,
      // updateCart,
      // submitOrder,
      // onCheckOutSession,
      // confirmIntent,
      // onStoreCheckout,
      // setLoading,
      // setOrder,
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
  return <CheckoutContext.Provider value={storeValues}>{children}</CheckoutContext.Provider>;
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
