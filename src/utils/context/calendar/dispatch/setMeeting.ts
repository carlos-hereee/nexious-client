import { CAL_ACTIONS } from "@actions/CalendarAction";
import { CalendarDispatchProps } from "app-calendar";

export const setMeeting = ({ dispatch, meeting }: CalendarDispatchProps) => {
  // require key variable
  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: true });
  if (meeting) dispatch({ type: CAL_ACTIONS.SET_CAL_MEETING, payload: meeting });

  dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: false });
};
