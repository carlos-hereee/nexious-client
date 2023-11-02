export const findNextOpenApp = (events) => {
  if (!events.length) return { error: "All booked up, try again later" };
  console.log("events", events);
};
