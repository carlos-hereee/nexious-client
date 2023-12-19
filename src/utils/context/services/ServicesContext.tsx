import { createContext, useCallback, useMemo, useReducer } from "react";
import servicesState from "@data/servicesState.json";
import { MerchProps, ServiceSchema } from "services-context";
import { ChildProps } from "app-types";
import { SERVICE_ACTIONS } from "@actions/ServiceActions";
import { reducer } from "./ServicesReducer";
import { onAddToCart } from "./dispatch/onAddToCart";
import { onRemoveFromCart } from "./dispatch/onRemoveFromCart";
import { requestSecret } from "./request/requestSecret";
import { checkOutSession } from "./request/checkOutSession";
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

export const ServicesContext = createContext<ServiceSchema>({} as ServiceSchema);
export const ServicesState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, servicesState);

  const addToCart = useCallback((cart: MerchProps[], merch: MerchProps) => {
    onAddToCart({ dispatch, cart, merch });
  }, []);
  const removeFromCart = useCallback((cart: MerchProps[], merch: MerchProps) => {
    onRemoveFromCart({ dispatch, cart, merch });
  }, []);
  const updateCart = useCallback((cart: MerchProps[]) => {
    dispatch({ type: SERVICE_ACTIONS.UPDATE_CART, payload: cart });
  }, []);
  // const submitOrder = useCallback((props: SubmitPaymentProps) => {
  //   const { cart } = props;
  //   requestSecret({ cart, dispatch });
  // }, []);
  const submitOrder = useCallback((cart: MerchProps[]) => {
    requestSecret({ cart, dispatch });
  }, []);
  const onCheckOutSession = useCallback((cart: MerchProps[]) => {
    checkOutSession({ cart, dispatch });
  }, []);
  const servicesValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      cart: state.cart,
      stripeSecret: state.stripeSecret,
      paymentMethods: state.paymentMethods,
      addToCart,
      removeFromCart,
      updateCart,
      submitOrder,
      onCheckOutSession,
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
  }, [state.isLoading, state.cart, state.stripeSecret]);
  return <ServicesContext.Provider value={servicesValues}>{children}</ServicesContext.Provider>;
};

// return (
//   <ServicesContext.Provider
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
//   </ServicesContext.Provider>
