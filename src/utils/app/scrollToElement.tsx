export const scrollToMeetings = () => {
  const element = document.getElementById("calendar-events");
  if (element) element.scrollIntoView({ block: "end", behavior: "smooth" });
};
export const scrollToId = (id: string, loacation?: ScrollLogicalPosition) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ block: loacation || "end", behavior: "smooth" });
};
