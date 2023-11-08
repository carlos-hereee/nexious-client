import { useAxiosAuth } from "../../../axios";

export const getCalendar = async (dispatch) => {
  try {
    const { data } = await axiosAuth.get("/calendar/events");
    // console.log("get calendar", data);
    // updateCalendar(data.events);
    updateEvents(data);
    setDay(dateEqual(today, data));
  } catch (error) {
    const { status, data } = error.response;
    isDev && console.log("status", status, data);
    dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: data });
  }
};
