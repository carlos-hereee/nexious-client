export const removeFromCart = (dispatch, cart, item) => {
  const payload = cart.filter((c) => c.uid !== item.uid);
  if (item.isBookable) {
    const bookable = cart.filter((c) => c.isBookable);
    const removable = bookable.filter((b) => b.uid !== item.uid);
    dispatch({ type: "UPDATE_BOOKABLE", payload: removable });
  }
  dispatch({ type: "UPDATE_CART", payload });
};
