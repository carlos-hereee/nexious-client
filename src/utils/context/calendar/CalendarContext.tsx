import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import calendarState from "@data/state/calendarState.json";
import { CalEvent, ICalendarSchema, IEvent, MeetingDetials, PostEvent } from "app-calendar";
import { CalendarProps, ChildProps } from "app-types";
import { AppContext } from "@context/app/AppContext";
import { CAL_ACTIONS } from "@actions/CalendarAction";
import { reducer } from "./CalendarReducer";
import { setCalendar } from "./dispatch/setCalendar";
import { setSelectedDay } from "./dispatch/setSelectedDay";
import { postCalEvent } from "./request/postCalEvent";
import { fetchCalendar } from "./request/fetchCalendar";
import { setMeeting } from "./dispatch/setMeeting";
// import { contactUs } from "./helpers/contactUs";
// import { getCalendarDay } from "./helpers/getCalendarDay";
// import { setDay } from "./helpers/setDay";
// import { setMeeting } from "./helpers/setMeeting";
// import { bookNow } from "./helpers/bookNow";
// import { resetDay } from "./helpers/resetDay";
// import { updateEvents } from "./helpers/updateEvents";
// import { setError } from "./helpers/setError";
// import { addCalendarEvent } from "./helpers/addCalendarEvent";

export const CalendarContext = createContext<ICalendarSchema>({} as ICalendarSchema);
export const CalendarState = ({ children }: ChildProps) => {
  const [state, dispatch] = useReducer(reducer, calendarState);
  const { calendar } = useContext(AppContext);

  useEffect(() => {
    if (calendar) setCalendar({ dispatch, calendar });
  }, [calendar]);

  const setCalStatus = useCallback((status: string) => dispatch({ type: CAL_ACTIONS.SET_REQUEST_STATUS, payload: status }), []);
  const updateCalendar = useCallback((cal: CalendarProps) => setCalendar({ dispatch, calendar: cal }), []);
  const updateSelectedDay = useCallback((day: CalEvent) => setSelectedDay({ dispatch, day }), []);
  const updateMeeting = useCallback((meeting: MeetingDetials) => setMeeting({ dispatch, meeting }), []);
  const updateActiveEvent = useCallback((event: IEvent) => dispatch({ type: CAL_ACTIONS.SET_EVENT, payload: event }), []);
  const addCalendarEvent = useCallback((d: PostEvent) => postCalEvent({ dispatch, ...d, updateCalendar, setCalStatus }), []);
  const getCalendar = useCallback((data: { appId: string }) => fetchCalendar({ dispatch, ...data, updateCalendar }), []);

  const calendarValues = useMemo(() => {
    return {
      isLoading: state.isLoading,
      errorMessage: state.errorMessage,
      selectedDay: state.selectedDay,
      theme: state.theme,
      calendarId: state.calendarId,
      requestStatus: state.requestStatus,
      calendarLink: state.calendarLink,
      closeTime: state.closeTime,
      startTime: state.startTime,
      meeting: state.meeting,
      workWeek: state.workWeek,
      events: state.events,
      event: state.event,
      name: state.name,
      schedule: state.schedule,
      updateSelectedDay,
      addCalendarEvent,
      getCalendar,
      updateMeeting,
      updateActiveEvent,
      setCalStatus,
    };
  }, [
    state.isLoading,
    state.calendarId,
    state.events,
    state.workWeek,
    state.name,
    state.selectedDay,
    state.meeting,
    state.event,
    state.requestStatus,
  ]);

  return <CalendarContext.Provider value={calendarValues}>{children}</CalendarContext.Provider>;
};

// {
// isLoading: state.isLoading,
// calendar: state.calendar,
// selectedDay: state.selectedDay,
// meeting: state.meeting,
// events: state.events,
// booked: state.booked,
// error: state.error,
// contactUs: (a) => contactUs(dispatch, a),
// getCalendarDay: (a) => getCalendarDay(dispatch, a),
// setDay: (a) => setDay(dispatch, a),
// setMeeting: (a) => setMeeting(dispatch, a),
// bookNow: (a, b) => bookNow(dispatch, a, b),
// resetDay: (a) => resetDay(dispatch, a),
// findNextOpenApp: (a, b) => findNextOpenApp(dispatch, a, b),
// setError: (a) => setError(dispatch, a),
// addCalendarEvent: (a) => addCalendarEvent(dispatch, a),
// }
