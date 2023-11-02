import moment from "moment/moment";

export const formatDate = (t) => moment(t).format("dddd MMM DD YYYY");
export const formatTime = (t) => moment(t).format("hh:mm a");
export const formatMilli = (t) => Date.parse(t);
export const today = formatDate(new Date());
export const dateEqual = (date, events) => {
  return events.filter((event) => event.title === date)[0];
};

export const getMeetingList = (arr) => {
  let filtered = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (current.hasList && formatMilli(current.title) >= formatMilli(today)) {
      const hasList = current.list.filter((l) => l.isOpen);
      filtered.push(current);
      filtered[filtered.length - 1].list = hasList;
    }
  }
  return filtered;
};
// export const
export const minDate = (list) => {
  return list.reduce((a, b) => {
    return formatMilli(a.title) < formatMilli(b.title) ? a : b;
  });
};
export const minTime = (list) => {
  return list.reduce((a, b) => {
    return formatMilli(a.date) < formatMilli(b.date) ? a : b;
  });
};
