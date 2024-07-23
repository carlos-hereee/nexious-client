import { CAL_ACTIONS } from "@actions/CalendarAction";
import { CalendarDispatchProps } from "app-calendar";

export const setSelectedDay = ({ dispatch, day }: CalendarDispatchProps) => {
  // require key variable
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: true });
  if (day) dispatch({ type: CAL_ACTIONS.SET_CAL_SELECTED_DAY, payload: day });
  else dispatch({ type: CAL_ACTIONS.SET_ERROR, payload: "Unable to adjust day" });
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: false });
};
