import { CAL_ACTIONS } from "@actions/CalendarAction";
import { CalendarDispatchProps } from "app-calendar";

export const setCalendar = ({ dispatch, calendar }: CalendarDispatchProps) => {
  // require key variable
  console.log("calendar :>> ", calendar);
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: true });
};
