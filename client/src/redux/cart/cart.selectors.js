import { createSelector } from "reselect";

//there is 2 types of selectors that we can write, the first one called an input selector (doesn't use createSelector) and  the second one an output selector (use both input selector and createSelector to build themeselves)

//input selector => function that takes the whole state and returns a slice of it
const selectCart = (state) => state.cart;

//output selector

//takes 2 arguments the first one is an array of input selectors
//the second one will be a function that will return the value we want out of the selector and what we are going to get in its parameters is each output is the input selectors in the array but in the order that these selectors are written

//and because we used createSelector to make this selectCartItems it's now a memoized selector
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedPrice, cartItem) =>
      accumulatedPrice + cartItem.quantity * cartItem.price,
    0
  )
);
