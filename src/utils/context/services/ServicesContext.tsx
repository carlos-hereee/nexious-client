import { createContext, useMemo, useReducer } from "react";
import servicesState from "@data/servicesState.json";
import { ServiceSchema } from "services-context";
import { ChildProps } from "app-types";
import { reducer } from "./ServicesReducer";
// import { AppContext } from "../app/AppContext";
// import { bookEvent } from "./helpers/bookEvent";
// import { filter } from "./helpers/filter";
// import { addToBooked } from "./helpers/addToBooked";
// import { addToCart } from "./helpers/addToCart";
// import { setTotal } from "./helpers/setTotal";
// import { bookingRequired } from "./helpers/BookingRequired";
// import { setIsUserReq } from "./helpers/setIsUserReq";
// import { setActive } from "./helpers/setActive";
// import { removeFromCart } from "./helpers/removeFromCart";
// import { updateServices } from "./helpers/updateServices";

export const ServicesContext = createContext<ServiceSchema>({} as ServiceSchema);
export const ServicesState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, servicesState);
  // const { services } = useContext(AppContext);

  // useEffect(() => {
  //   if (services && services?.services) {
  //     // updateServices(dispatch, services.services);
  //   }
  // }, [services]);

  const servicesValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      // isFiltered: state.isFiltered,
      // filtered: state.filtered,
      // cart: state.cart,
      // active: state.active,
      // isUserReq: state.isUserReq,
      // total: state.total,
      // bookable: state.bookable,
      // booked: state.booked,
      // services: state.services,
      // bookEvent: (a, b, c) => bookEvent(dispatch, a, b, c),
      // filter: (a, b) => filter(dispatch, a, b),
      // addToCart: (a, b) => addToCart(dispatch, a, b),
      // addToBooked: (a, b, c, d) => addToBooked(dispatch, a, b, c, d),
      // removeFromCart: (a, b) => removeFromCart(dispatch, a, b),
      // setActive: (a) => setActive(dispatch, a),
      // bookingRequired: (a, b) => bookingRequired(dispatch, a, b),
      // onQuantityChange: (a, b) => onQuantityChange(dispatch, a, b),
      // setIsUserReq: (a) => setIsUserReq(dispatch, a),
      // setTotal: (a) => setTotal(dispatch, a),
    };
  }, [state.isLoading]);
  return (
    <ServicesContext.Provider value={servicesValues}>{children}</ServicesContext.Provider>
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
    //       addToCart: (a, b) => addToCart(dispatch, a, b),
    //       addToBooked: (a, b, c, d) => addToBooked(dispatch, a, b, c, d),
    //       removeFromCart: (a, b) => removeFromCart(dispatch, a, b),
    //       setActive: (a) => setActive(dispatch, a),
    //       bookingRequired: (a, b) => bookingRequired(dispatch, a, b),
    //       onQuantityChange: (a, b) => onQuantityChange(dispatch, a, b),
    //       setIsUserReq: (a) => setIsUserReq(dispatch, a),
    //       setTotal: (a) => setTotal(dispatch, a),
    //     }}
    //   >
    //     {children}
    //   </ServicesContext.Provider>
  );
};
