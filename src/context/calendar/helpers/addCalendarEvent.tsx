import { isDev } from "@app/config";
import { axiosAuth } from "@app/utils/axios/axiosAuth";

export const addCalendarEvent = async (dispatch, day) => {
  try {
    const response = await axiosAuth.post("/calendar/add-event", { day });
    console.log("data", response);
  } catch (error) {
    if (isDev) console.log("error adding calendar event ", error);
    const message = error.response.data;
    dispatch({ type: "SET_ERROR", payload: message });
  }
};
