// export const bookEvent = (dispatch, eventData, cart, idx) => {
//   // add  booked
//   const data = {
//     ...cart[idx],
//     isBookingRequired: false,
//     isBooked: true,
//     bookingErr: "",
//     meeting: eventData.meeting,
//   };
//   console.log(data);
//   dispatch({ type: "BOOK_REQUIRED", payload: { idx, data } });
//   // add user data to user if not exists
//   if (!user.uid) updateUserData({ ...eventData.values, uid: shortid.generate() });
//   // notify success
//   addMessageToLog({
//     uid: eventData.meeting.uid,
//     success: true,
//     data: {
//       isLink: true,
//       isNav: true,
//       link: "/checkout",
//       word: "checkout",
//       message: "Successfully booked event, would you like to proceed to checkout?",
//     },
//   });
// };
