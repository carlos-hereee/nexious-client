export const scrollToMeetings = () => {
  const element = document.getElementById("calendar-events");
  element.scrollIntoView({ block: "end", behavior: "smooth" });
};
export const scrollToCartItem = (data) => {
  const element = document.getElementById(data.uid);
  element.scrollIntoView({ block: "end", behavior: "smooth" });
};
