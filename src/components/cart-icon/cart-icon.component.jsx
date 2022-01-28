import React from "react";

import { ReactComponent as Shoppingicon } from "../../assets/122 shopping-bag.svg";
import { connect } from "react-redux";

import "./cart-icon.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

//Memoization Library (Reselect)
import { createStructuredSelector } from "reselect";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

//{ toggleCartHidden } = this.props.toggleCartHidden
const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <Shoppingicon className="shopping-icon" />
    <span className="item-count"> {itemCount} </span>
  </div>
);

//when a component want to change the state then that where mapDispatchToProps comes in (CartIcon Component is the one updating the cartReducer state (hidden :  property) whenever we click on the Cart Icon)

//now we're going to be able to access toggleCartHidden as a props in our CartIcon Component
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
