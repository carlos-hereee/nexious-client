import { CAL_ACTIONS } from "@actions/CalendarAction";
import { CalendarDispatchProps } from "app-calendar";

export const setCalendar = ({ dispatch, calendar }: CalendarDispatchProps) => {
  // require key variable
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: true });
  if (calendar) {
    if (calendar.calendarId) dispatch({ type: CAL_ACTIONS.SET_CAL_ID, payload: calendar.calendarId });
    if (calendar.calendarLink) dispatch({ type: CAL_ACTIONS.SET_CAL_LINK, payload: calendar.calendarLink });
    if (calendar.theme) dispatch({ type: CAL_ACTIONS.SET_THEME, payload: calendar.theme });
    if (calendar.closeTime) dispatch({ type: CAL_ACTIONS.SET_CAL_CLOSE_TIME, payload: calendar.closeTime });
    if (calendar.startTime) dispatch({ type: CAL_ACTIONS.SET_CAL_START_TIME, payload: calendar.startTime });
    if (calendar.workWeek) dispatch({ type: CAL_ACTIONS.SET_CAL_WORK_WEEK, payload: calendar.workWeek });
    if (calendar.name) dispatch({ type: CAL_ACTIONS.SET_CAL_NAME, payload: calendar.name });
    if (calendar.schedule) dispatch({ type: CAL_ACTIONS.SET_CAL_SCHEDULE, payload: calendar.schedule });
    if (calendar.events) dispatch({ type: CAL_ACTIONS.SET_CAL_EVENTS, payload: calendar.events });
  } else dispatch({ type: CAL_ACTIONS.SET_ERROR, payload: "Unable to update calendar" });
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: false });
};
