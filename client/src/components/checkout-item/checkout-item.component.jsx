import React from "react";
import "./checkout-item.styles.scss";

import { useDispatch } from "react-redux";

import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { selectCartItems } from "../../redux/cart/cart.selectors";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  const dispatch = useDispatch();
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => dispatch(removeItem(cartItem))}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => dispatch(addItem(cartItem))}>
          &#10095;
        </div>
      </span>
      <span className="price">
        <b>$</b>
        {price}
      </span>
      <div
        className="remove-button"
        onClick={() => dispatch(clearItemFromCart(cartItem))}
      >
        &#10005;
      </div>
    </div>
  );
};

//check the Profiler in the React Dev tools
//if we add To Cart 4 items and go to checkout page and delete an item all other items will be re rendered so we will use React.memo() to not re render them because they didn't change
export default React.memo(CheckoutItem);
