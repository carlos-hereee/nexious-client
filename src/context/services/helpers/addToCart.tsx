export const addToCart = (dispatch, cart, item) => {
  cart.push(item);
  dispatch({ type: "UPDATE_CART", payload: cart });
};
