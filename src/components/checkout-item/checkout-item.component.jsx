import React from "react";
import "./checkout-item.styles.scss";

import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { selectCartItems } from "../../redux/cart/cart.selectors";

import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { imageUrl, name, price, quantity } = cartItem;

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">
        <b>$</b>
        {price}
      </span>
      <div className="remove-button" onClick={() => clearItem(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   cartItems: selectCartItems,
// });

//clearItem is just naming of the action to pass as props to our Component
const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});
export default connect(null, mapDispatchToProps)(CheckoutItem);
