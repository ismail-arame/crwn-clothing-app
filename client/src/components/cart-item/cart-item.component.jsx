import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ item: { name, price, imageUrl, quantity } }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

//because everyTime we add To cart we loop the cartItems from start to end so we waste renders and the solution is to memoize the CartItem Functional Component to save us renders
export default React.memo(CartItem);
