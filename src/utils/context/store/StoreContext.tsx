import { createContext, useCallback, useMemo, useReducer } from "react";
import storeState from "@data/storeState.json";
import { ChildProps } from "app-types";
import { STORE_ACTIONS } from "@actions/StoreActions";
import {
  CartProps,
  OrderSchema,
  StoreSchema,
  StoreCheckout,
  PayoutAmmount,
  CheckoutIntent,
  TrackOrder,
  PostReview,
} from "store-context";
import { reducer } from "./StoreReducer";
// import { onAddToCart } from "./dispatch/onAddToCart";
import { requestSecret } from "./request/requestSecret";
import { checkOutSession } from "./request/checkOutSession";
import { confirmCheckoutIntent } from "./request/confirmCheckoutIntent";
import { checkoutStoreSession } from "./request/checkoutStoreSession";
import { getStripeBalance } from "./request/getStripeBalance";
import { managePayouts } from "./request/managePayouts";
import { getStripeAccount } from "./request/getStripeAccount";
import { billingPortal } from "./request/billingPortal";
import { trackCheckoutOrder } from "./request/trackCheckoutOrder";
import { addReview } from "./request/addReview";
import { getMerchWithId } from "./request/getMerchWithId";
import { addReviewMessage } from "./request/addReviewMessage";

export const StoreContext = createContext<StoreSchema>({} as StoreSchema);
export const StoreState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, storeState);

  const setLoading = useCallback((loading: boolean) => dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: loading }), []);
  const setTrackOrder = useCallback((data?: OrderSchema) => dispatch({ type: STORE_ACTIONS.SET_TRACK_ORDER, payload: data }), []);

  const submitOrder = useCallback((cart: CartProps[]) => requestSecret({ cart, dispatch }), []);
  // stripe checkout session
  const onCheckOutSession = useCallback((data: StoreCheckout) => checkOutSession({ ...data, dispatch }), []);
  // store checkout
  const onStoreCheckout = useCallback((data: StoreCheckout) => checkoutStoreSession({ ...data, dispatch }), []);
  const confirmIntent = useCallback((data: CheckoutIntent) => confirmCheckoutIntent({ dispatch, ...data }), []);
  const getMerch = useCallback((merchId: string) => getMerchWithId({ dispatch, merchId }), []);
  const orderTracker = useCallback((data: TrackOrder) => trackCheckoutOrder({ dispatch, ...data }), []);
  const getBalance = useCallback((appId: string) => getStripeBalance({ dispatch, appId }), []);
  const handlePayouts = useCallback((data: PayoutAmmount) => managePayouts({ dispatch, ...data }), []);
  const getAccount = useCallback((appId: string) => getStripeAccount({ dispatch, appId }), []);
  const manageBilling = useCallback((sessionId: string) => billingPortal({ dispatch, sessionId }), []);
  // user actions
  const postReview = useCallback((data: PostReview) => addReview({ dispatch, ...data }), []);
  const replyReviewMessage = useCallback((data: PostReview) => addReviewMessage({ dispatch, ...data }), []);
  // const updateAccount = useCallback((config: StripeConfig) => {
  //   updateStripeAccount({ dispatch, config });
  // }, []);
  const storeValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      cart: state.cart,
      error: state.error,
      trackOrder: state.trackOrder,
      order: state.order,
      location: state.location,
      location2: state.location2,
      merch: state.merch,
      stripeSecret: state.stripeSecret,
      stripeConfirmation: state.stripeConfirmation,
      stripeConfig: state.stripeConfig,
      stripeBalance: state.stripeBalance,
      // addToCart,
      submitOrder,
      onCheckOutSession,
      confirmIntent,
      onStoreCheckout,
      setLoading,
      getBalance,
      handlePayouts, // stripe account
      getAccount,
      manageBilling,
      orderTracker,
      setTrackOrder,
      postReview,
      getMerch,
      replyReviewMessage,
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
  }, [state.isLoading, state.cart, state.stripeBalance, state.stripeConfig, state.error, state.merch]);
  return <StoreContext.Provider value={storeValues}>{children}</StoreContext.Provider>;
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
