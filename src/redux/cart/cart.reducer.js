import { cartActionTypes } from "./cart.types";

import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

//we are not using the payload because we don't need one
export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };

    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        //if an object stays the same and simply a property changes react will not re render because the props are the same (shouldComponentRender if(prevProps === currentProps) the Component won't re render) so we have to return a new Object whenever we change the value of a property
        // cartItems: [...state.cartItems, action.payload],
        //  bad => cartItems: state.cartItems.push(action.payload),
        cartItems: addItemToCart(state.cartItems, action.payload),
      };

    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };

    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        //removing a cartItem from our cartItems array whenever we click on the UTF-8 winding X button
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };

    case cartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
