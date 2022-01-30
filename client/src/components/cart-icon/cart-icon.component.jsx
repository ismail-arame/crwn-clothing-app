import React from "react";

import { ReactComponent as Shoppingicon } from "../../assets/122 shopping-bag.svg";
import { useSelector, useDispatch } from "react-redux";

import "./cart-icon.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

//Memoization Library (Reselect)
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

//{ toggleCartHidden } = this.props.toggleCartHidden
const CartIcon = () => {
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
      <Shoppingicon className="shopping-icon" />
      <span className="item-count"> {itemCount} </span>
    </div>
  );
};

export default CartIcon;
