import { CAL_ACTIONS } from "@actions/CalendarAction";
import { CalendarActionProps, ICalendarSchema } from "app-calendar";

export const reducer = (state: ICalendarSchema, action: CalendarActionProps): ICalendarSchema => {
  switch (action.type) {
    case CAL_ACTIONS.IS_LOADING:
      return { ...state, isLoading: action.payload };
    case CAL_ACTIONS.SET_ERROR:
      return { ...state, errorMessage: action.payload };
    // case "BOOKED":
    //   return { ...state, booked: action.payload };
    // case "UPDATE_SELECTED_DAY":
    //   return { ...state, selectedDay: action.payload };
    // case "UPDATE_MEETING":
    //   return { ...state, meeting: action.payload };
    // case "UPDATE_CALENDAR":
    //   return { ...state, calendar: action.payload };
    // case "BOOK_NOW":
    //   return { state, meeting: action.payload };
    // case "BOOK_EVENT":
    //   return { ...state, booked: [...state.booked, action.payload] };
    default:
      return state;
  }
};
