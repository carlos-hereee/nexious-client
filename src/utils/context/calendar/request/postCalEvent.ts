import { axiosAuth } from "@axios/axiosAuth";
import { CalendarDispatchProps } from "app-calendar";

export const postCalEvent = async ({ dispatch, event, appId }: CalendarDispatchProps) => {
  // require key variable
  if (!event) throw Error("event param is required");
  try {
    const response = await axiosAuth.post(`/calendar/${appId}/add-event`, event);
    console.log("data", response);
  } catch (error) {
    // const message = error.response.data;
    // dispatch({ type: "SET_ERROR", payload: message });
  }
};
