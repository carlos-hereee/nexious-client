import { createContext, useCallback, useMemo, useReducer } from "react";
import storeState from "@data/storeState.json";
import { ChildProps, StoreProps } from "app-types";
import { STORE_ACTIONS } from "@actions/ServiceActions";
import {
  CartProps,
  MerchProps,
  OrderSchema,
  StoreSchema,
  StoreCheckout,
  PayoutAmmount,
  CheckoutIntent,
  TrackOrder,
} from "store-context";
import { reducer } from "./StoreReducer";
import { onAddToCart } from "./dispatch/onAddToCart";
import { requestSecret } from "./request/requestSecret";
import { checkOutSession } from "./request/checkOutSession";
import { confirmCheckoutIntent } from "./request/confirmCheckoutIntent";
import { checkoutStoreSession } from "./request/checkoutStoreSession";
import { getStripeBalance } from "./request/getStripeBalance";
import { managePayouts } from "./request/managePayouts";
import { getStripeAccount } from "./request/getStripeAccount";
import { billingPortal } from "./request/billingPortal";
import { trackCheckoutOrder } from "./request/trackCheckoutOrder";
// import { updateOrder } from "../admin/requests/store/updateOder";
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

export const StoreContext = createContext<StoreSchema>({} as StoreSchema);
export const StoreState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, storeState);

  const addToCart = useCallback((cart: CartProps[], store: StoreProps, merch: MerchProps) => {
    onAddToCart({ dispatch, cart, merch, store });
  }, []);

  const updateCart = useCallback((cart: CartProps[]) => dispatch({ type: STORE_ACTIONS.UPDATE_CART, payload: cart }), []);
  const setLoading = useCallback((loading: boolean) => dispatch({ type: STORE_ACTIONS.IS_LOADING, payload: loading }), []);
  const setOrder = useCallback((data?: OrderSchema) => dispatch({ type: STORE_ACTIONS.SET_STORE_ORDER, payload: data }), []);

  const submitOrder = useCallback((cart: CartProps[]) => requestSecret({ cart, dispatch }), []);
  // stripe checkout session
  const onCheckOutSession = useCallback((data: StoreCheckout) => checkOutSession({ ...data, dispatch }), []);
  // store checkout
  const onStoreCheckout = useCallback((data: StoreCheckout) => checkoutStoreSession({ ...data, dispatch }), []);
  const confirmIntent = useCallback((data: CheckoutIntent) => confirmCheckoutIntent({ dispatch, ...data }), []);
  const orderTracker = useCallback((data: TrackOrder) => trackCheckoutOrder({ dispatch, ...data }), []);
  const getBalance = useCallback((appId: string) => getStripeBalance({ dispatch, appId }), []);
  const handlePayouts = useCallback((data: PayoutAmmount) => managePayouts({ dispatch, ...data }), []);
  const getAccount = useCallback((appId: string) => getStripeAccount({ dispatch, appId }), []);
  const manageBilling = useCallback((sessionId: string) => billingPortal({ dispatch, sessionId }), []);
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
      stripeSecret: state.stripeSecret,
      stripeConfirmation: state.stripeConfirmation,
      stripeConfig: state.stripeConfig,
      stripeBalance: state.stripeBalance,
      addToCart,
      updateCart,
      submitOrder,
      onCheckOutSession,
      confirmIntent,
      onStoreCheckout,
      setLoading,
      setOrder,
      getBalance,
      handlePayouts, // stripe account
      getAccount,
      manageBilling,
      orderTracker,
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
  }, [state.isLoading, state.cart, state.stripeBalance, state.stripeConfig, state.error]);
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
