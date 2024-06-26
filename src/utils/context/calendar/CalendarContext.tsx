// import { createContext, useMemo, useReducer } from "react";
// import calendarState from "@data/calendarState.json";
// import { ICalendarSchema } from "app-calendar";
// import { ChildProps } from "app-types";
// import { reducer } from "./CalendarReducer";
// // import { contactUs } from "./helpers/contactUs";
// // import { getCalendarDay } from "./helpers/getCalendarDay";
// // import { setDay } from "./helpers/setDay";
// // import { setMeeting } from "./helpers/setMeeting";
// // import { bookNow } from "./helpers/bookNow";
// // import { resetDay } from "./helpers/resetDay";
// // import { updateEvents } from "./helpers/updateEvents";
// // import { setError } from "./helpers/setError";
// // import { addCalendarEvent } from "./helpers/addCalendarEvent";

// export const CalendarContext = createContext<ICalendarSchema>({} as ICalendarSchema);
// export const CalendarState = ({ children }: ChildProps) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [state, _dispatch] = useReducer(reducer, calendarState);
//   // const { calendar } = useContext(AppContext);

//   // useEffect(() => {
//   //   if (calendar && calendar.events) {
//   //     // updateEvents(dispatch, calendar.events);
//   //     // console.log("calendar", calendar);
//   //   }
//   // }, [calendar]);

//   const calendarValues = useMemo(() => {
//     return { isLoading: state.isLoading, calendar: state.calendar, selectedDay: state.selectedDay };
//   }, [state.isLoading]);

//   return <CalendarContext.Provider value={calendarValues}>{children}</CalendarContext.Provider>;
// };

// // {
// // isLoading: state.isLoading,
// // calendar: state.calendar,
// // selectedDay: state.selectedDay,
// // meeting: state.meeting,
// // events: state.events,
// // booked: state.booked,
// // error: state.error,
// // contactUs: (a) => contactUs(dispatch, a),
// // getCalendarDay: (a) => getCalendarDay(dispatch, a),
// // setDay: (a) => setDay(dispatch, a),
// // setMeeting: (a) => setMeeting(dispatch, a),
// // bookNow: (a, b) => bookNow(dispatch, a, b),
// // resetDay: (a) => resetDay(dispatch, a),
// // findNextOpenApp: (a, b) => findNextOpenApp(dispatch, a, b),
// // setError: (a) => setError(dispatch, a),
// // addCalendarEvent: (a) => addCalendarEvent(dispatch, a),
// // }
