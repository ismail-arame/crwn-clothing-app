import { cartActionTypes } from "./cart.types";

//we are not passing the payload because we don't need it
//in our new cart state the hidden will be either true or false so no payload needed (payload is an optional property on our object )
export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN,
});

export const addItem = (item) => ({
  type: cartActionTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: cartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART,
  // payload: cartItems,
});
