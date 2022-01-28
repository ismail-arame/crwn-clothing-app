//Utility Functions allow us to keep our files clean and organize functions that we may need in multiple files in one location

//adding multiple items to cart (if the item is already in the cartItems we just want to increase the quantity)
//adding utility function to our Redux Code

//cartItems => the current cartItems array
//cartItemToAdd => if it exists in cartItems array then we wanna increase the quantity if it doesn't then add it to the cartItems array
export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    //map will return a new array and that what we want passing a new Object in order to make react re render properly our Components when the state change
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  }
  // cartItems.some((cartItem) => cartItem === cartItemToAdd) ?
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  } else {
    //returning a new Object to make react rerender components
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItemToRemove.quantity - 1 }
        : cartItem
    );
  }
};
