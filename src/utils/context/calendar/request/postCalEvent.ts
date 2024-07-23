import { CAL_ACTIONS } from "@actions/CalendarAction";
import { axiosAuth } from "@axios/axiosAuth";
import { CalendarDispatchProps } from "app-calendar";

export const postCalEvent = async ({ dispatch, event, appId, updateCalendar }: CalendarDispatchProps) => {
  // require key variable
  if (!event) throw Error("event param is required");
  try {
    dispatch({ type: CAL_ACTIONS.IS_LOADING, payload: true });
    const { data } = await axiosAuth.post(`/calendar/${appId}/add-event`, event);
    if (updateCalendar) updateCalendar(data);
  } catch (error) {
    // const message = error.response.data;
    // dispatch({ type: "SET_ERROR", payload: message });
  }
};
